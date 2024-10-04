"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getUser, updateUserData } from "@/actions/user";
import { prisma } from "@/lib/db";
import { PAGE_SIZE } from "@/utils/constants";
import { catchAsync } from "@/utils/catchAsync";

interface OrderItem {
  id: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

interface OrderDataType {
  userData: {
    name: string;
    email: string;
    phone: string;
    shippingAddress: string;
  };
  orderItems: OrderItem[];
  totalPrice: number;
}

interface OrderStatusType {
  id: string;
  status: "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELED";
}

export const getOrdersLength = async (filter = "all") => {
  const filtered: object =
    filter === "all" ? {} : { where: { status: filter.toUpperCase() } };

  const length = await prisma.order.count({ ...filtered });
  return length;
};

export const getOrdersUserLength = async (filter: string) => {
  const user = await getUser(["id"]);
  if (!user?.id) throw new Error("User not authenticated");

  const filtered: object =
    filter === "all" ? {} : { status: filter.toUpperCase() };
  const length = await prisma.order.count({
    where: { userId: user?.id, ...filtered },
  });
  return length;
};

export const getOrder = catchAsync(async (id: string) => {
  const user = await getUser(["id", "role"]);
  if (!user?.id && user?.role !== "ADMIN")
    throw new Error("User not authenticated");

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          phone: true,
          email: true,
          shippingAddress: true,
        },
      },

      items: {
        include: {
          product: {
            select: { id: true, name: true, image: true, price: true },
          },
        },
      },
    },
  });

  if (order?.userId !== user.id && user.role !== "ADMIN") {
    throw new Error("Cannot get order data");
  }

  return order;
});

export const getAllOrders = catchAsync(async (page: number, filter: string) => {
  const user = await getUser(["role"]);
  if (user?.role !== "ADMIN")
    throw new Error("User does not have admin privileges");

  const filtered: object =
    filter === "all" ? {} : { where: { status: filter.toUpperCase() } };

  const orders = await prisma.order.findMany({
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE * page,
    ...filtered,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: { name: true, shippingAddress: true },
      },

      items: {
        include: {
          product: {
            select: { name: true, image: true, price: true },
          },
        },
      },
    },
  });

  return orders;
});

export const getAllOrdersUser = catchAsync(
  async (page: number, filter: string) => {
    const user = await getUser(["id"]);
    if (!user?.id) throw new Error("User not authenticated");

    const filtered: object =
      filter === "all" ? {} : { status: filter.toUpperCase() };

    const orders = await prisma.order.findMany({
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE * page,
      where: { userId: user.id, ...filtered },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: { name: true, shippingAddress: true },
        },

        items: {
          include: {
            product: {
              select: { name: true, image: true, price: true },
            },
          },
        },
      },
    });

    return orders;
  },
);

export const createOrder = catchAsync(async (orderData: OrderDataType) => {
  const user = await getUser(["id"]);
  if (!user?.id) throw new Error("User not authenticated");

  const { userData, orderItems, totalPrice } = orderData ?? {};
  if (!userData || !orderItems || !totalPrice)
    throw new Error("Required userData, orderItems, and totalPrice fields");

  await updateUserData(userData);
  await prisma.$transaction(async (prisma) => {
    const order = await prisma.order.create({
      data: {
        totalPrice,
        user: { connect: { id: user.id } },
      },
    });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        orderIds: {
          push: order.id,
        },
      },
    });

    const orderItemsData = orderItems.map(
      ({ id, quantity, selectedColor, selectedSize }) => ({
        orderId: order.id,
        productId: id,
        quantity,
        selectedColor,
        selectedSize,
      }),
    );

    await prisma.orderItem.createMany({
      data: orderItemsData,
    });
  });

  redirect("/account/orders");
});

export const updateOrderStatus = catchAsync(
  async ({ id, status }: OrderStatusType) => {
    const user = await getUser(["id", "orderIds", "role"]);
    if (!user?.id) throw new Error("User not authenticated");

    if (!user.orderIds.some((orderId) => orderId === id))
      throw new Error("Order ID not found in user's orders");

    const order = await prisma.order.update({
      where: { id },
      data: { status },
    });

    revalidatePath(`/account/orders/${order.id}`);
    revalidatePath(`/admin/orders/${order.id}`);
  },
);
