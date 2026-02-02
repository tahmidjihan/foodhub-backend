// index.ts
import express21 from "express";
import dotenv2 from "dotenv";
import cors from "cors";

// src/index.ts
import express20 from "express";

// src/api/meals/index.ts
import express2 from "express";

// src/api/meals/controllers/meals.controller.ts
import "express";

// src/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import "process";
import * as path from "path";
import { fileURLToPath } from "url";
import "@prisma/client/runtime/client";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.3.0",
  "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Meal {\n  id          String   @id @default(uuid())\n  name        String\n  price       Float\n  image       String\n  tags        String[]\n  description String   @default("No description provided")\n  type        String\n  providerId  String\n  Cart        Cart[]\n  provider    User     @relation(fields: [providerId], references: [id])\n  orders      order[]\n  reviews     review[]\n  categoryId  String\n  Category    Category @relation(fields: [categoryId], references: [id], onDelete: Restrict)\n}\n\nenum status {\n  Pending\n  InProgress\n  Completed\n  Cancelled\n}\n\nmodel order {\n  id        String   @id @default(uuid())\n  quantity  Int\n  total     Float\n  status    status   @default(Pending)\n  address   String   @default("No address provided")\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  MealId    String\n  UserId    String\n  Meal      Meal     @relation(fields: [MealId], references: [id])\n  User      User     @relation(fields: [UserId], references: [id])\n}\n\nmodel Cart {\n  id       String @id @default(uuid())\n  UserId   String\n  MealId   String\n  quantity Int\n  Meal     Meal   @relation(fields: [MealId], references: [id])\n  User     User   @relation(fields: [UserId], references: [id])\n}\n\nmodel review {\n  id          String @id @default(uuid())\n  UserId      String\n  MealId      String\n  description String\n  Meal        Meal   @relation(fields: [MealId], references: [id])\n  User        User   @relation(fields: [UserId], references: [id])\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  image     String?\n  createdAt DateTime @default(now())\n  meals     Meal[]\n}\n\nmodel ProviderProfile {\n  id        String   @id @default(uuid())\n  userId    String   @unique\n  name      String\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n}\n\nmodel User {\n  id              String            @id\n  name            String\n  email           String            @unique\n  emailVerified   Boolean           @default(false)\n  image           String?\n  createdAt       DateTime          @default(now())\n  updatedAt       DateTime          @updatedAt\n  role            Role              @default(Customer)\n  isActive        Boolean           @default(true)\n  cart            Cart[]\n  meals           Meal[]\n  accounts        Account[]\n  orders          order[]\n  sessions        Session[]\n  reviews         review[]\n  providerProfile ProviderProfile[]\n\n  @@map("user")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  userId                String\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum Role {\n  Admin\n  Provider\n  Customer\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"tags","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"type","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"Cart","kind":"object","type":"Cart","relationName":"CartToMeal"},{"name":"provider","kind":"object","type":"User","relationName":"MealToUser"},{"name":"orders","kind":"object","type":"order","relationName":"MealToorder"},{"name":"reviews","kind":"object","type":"review","relationName":"MealToreview"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"Category","kind":"object","type":"Category","relationName":"CategoryToMeal"}],"dbName":null},"order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"total","kind":"scalar","type":"Float"},{"name":"status","kind":"enum","type":"status"},{"name":"address","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"MealId","kind":"scalar","type":"String"},{"name":"UserId","kind":"scalar","type":"String"},{"name":"Meal","kind":"object","type":"Meal","relationName":"MealToorder"},{"name":"User","kind":"object","type":"User","relationName":"UserToorder"}],"dbName":null},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"UserId","kind":"scalar","type":"String"},{"name":"MealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"Meal","kind":"object","type":"Meal","relationName":"CartToMeal"},{"name":"User","kind":"object","type":"User","relationName":"CartToUser"}],"dbName":null},"review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"UserId","kind":"scalar","type":"String"},{"name":"MealId","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"Meal","kind":"object","type":"Meal","relationName":"MealToreview"},{"name":"User","kind":"object","type":"User","relationName":"UserToreview"}],"dbName":null},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":null},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"}],"dbName":null},"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"role","kind":"enum","type":"Role"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToUser"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToUser"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"orders","kind":"object","type":"order","relationName":"UserToorder"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"reviews","kind":"object","type":"review","relationName":"UserToreview"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"}],"dbName":"user"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/api/meals/controllers/meals.controller.ts
var getOne = async (req, res) => {
  const mealId = req.params.id;
  try {
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (meal) {
      res.status(200).json(meal);
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving meal", error });
  }
};
var getAll = async (req, res) => {
  const pagination = {
    skip: req.query.skip,
    take: req.query.take
  };
  if (!pagination) {
    res.status(400).json({ message: "Pagination parameters are required" });
    return;
  }
  await prisma.meal.findMany({
    where: {},
    take: parseInt(pagination.take),
    skip: parseInt(pagination.skip),
    include: { Category: true }
  }).then((meals) => {
    res.json(meals);
    console.log(meals);
  }).catch((error) => {
    res.status(500).json({ message: "Internal Server Error", error });
    console.log(error);
  });
};
async function getByProvider(req, res) {
  const id = req.params.id;
  await prisma.meal.findMany({ where: { providerId: id } }).then((meals) => {
    res.json(meals);
  }).catch((error) => {
    res.status(500).json({ message: "Internal Server Error", error });
  });
}
var meals_controller_default = { getOne, getAll, getByProvider };

// src/api/meals/index.ts
var router = express2.Router();
router.get("/:id", meals_controller_default.getOne);
router.get("/", meals_controller_default.getAll);
router.get("/provider/:id", meals_controller_default.getByProvider);
var meals_default = router;

// src/api/orders/index.ts
import express5 from "express";

// src/api/orders/controllers/orders.controller.ts
import "express";
var create = async (req, res) => {
  const order = req.body;
  const UserId = req.user?.id;
  try {
    const newOrder = await prisma.order.create({ data: { ...order, UserId } });
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating order", error });
  }
};
var getProviderOrders = async (req, res) => {
  const providerId = req.params.id;
  try {
    const orders = await prisma.order.findMany({
      where: {
        Meal: {
          providerId
          // Filter orders by meal's providerId
        }
      },
      include: {
        Meal: true,
        // Include meal details
        User: { select: { id: true, name: true, email: true } }
        // Include customer details
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching provider orders:", error);
    res.status(500).json({ message: "Error fetching provider orders", error });
  }
};
var getUserOrders = async (req, res) => {
  const userId = req.user?.id;
  try {
    const orders = await prisma.order.findMany({
      where: { UserId: userId },
      include: { Meal: true }
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};
var orders_controller_default = { create, getProviderOrders, getUserOrders };

// src/middlewares/authorize.ts
import "express";
import { fromNodeHeaders } from "better-auth/node";

// src/auth/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import dotenv from "dotenv";
import "better-auth/plugins/admin/access";
dotenv.config();
var auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
    // or "mysql", "postgresql", ...etc
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "Customer"
      }
    },
    session: {
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60
        // 5 minutes
      }
    },
    advanced: {
      cookiePrefix: "better-auth",
      useSecureCookies: process.env.NODE_ENV === "production",
      crossSubDomainCookies: {
        enabled: false
      },
      disableCSRFCheck: true
      // Allow requests without Origin header (Postman, mobile apps, etc.)
    }
  },
  secretKeyBase: process.env.SECRET_KEY_BASE || "",
  trustedOrigins: [
    "http://localhost:5000",
    // dev
    "https://foodhub-frontend-sigma.vercel.app"
  ],
  emailAndPassword: {
    enabled: true
  }
});

// src/middlewares/authorize.ts
async function authorize(req, res, next) {
  if (req.user) {
    next();
    return;
  }
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });
  if (session) {
    req.user = session.user;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
var authorize_default = authorize;

// src/api/orders/index.ts
var router2 = express5.Router();
router2.post("/", orders_controller_default.create);
router2.get("/", authorize_default, orders_controller_default.getUserOrders);
router2.get("/provider/:id", authorize_default, orders_controller_default.getProviderOrders);
var orders_default = router2;

// src/api/cart/index.ts
import express7 from "express";

// src/api/cart/controllers/cart.controller.ts
import "express";
var create2 = async (req, res) => {
  const cart = req.body;
  const UserId = req.user?.id;
  try {
    const newCart = await prisma.cart.create({ data: { ...cart, UserId } });
    res.status(201).json({ message: "Cart created successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Error creating cart", error });
  }
};
var deleteOne = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    await prisma.cart.delete({ where: { id: String(id), UserId: userId } });
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error });
  }
};
var getAll2 = async (req, res) => {
  const userId = req.user?.id;
  try {
    const carts = await prisma.cart.findMany({
      where: { UserId: userId },
      include: { Meal: true }
    });
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving carts", error });
  }
};
var getOne2 = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cart = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { Meal: true }
    });
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving cart", error });
  }
};
var cart_controller_default = { create: create2, deleteOne, getAll: getAll2, getOne: getOne2 };

// src/api/cart/index.ts
var router3 = express7.Router();
router3.post("/", cart_controller_default.create);
router3.get("/", cart_controller_default.getAll);
router3.delete("/:id", cart_controller_default.deleteOne);
router3.get("/:id", cart_controller_default.getOne);
var cart_default = router3;

// src/api/provider/index.ts
import express13 from "express";

// src/api/provider/controller/provider.controller.ts
import "express";
var getOne3 = async (req, res) => {
  const providerId = req.params.id;
  try {
    const provider = await prisma.user.findUnique({
      where: { id: providerId, role: "Provider" },
      include: { meals: true }
    });
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving provider", error });
  }
};
var getAll3 = async (req, res) => {
  try {
    const providers = await prisma.user.findMany({
      where: { role: "Provider" }
    });
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving providers", error });
  }
};
var createOne = async (req, res) => {
  const data = req.body;
  try {
    const provider = await prisma.providerProfile.create({ data });
    res.status(201).json(provider);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating provider", error });
  }
};
var provider_controller_default = { getOne: getOne3, getAll: getAll3, createOne };

// src/api/provider/orders/index.ts
import "express";
function patchOrder(req, res) {
  const orderId = req.params.id;
  const status = req.body.status;
  const result = prisma.order.update({
    where: { id: orderId },
    data: { status }
  });
  result.then((order) => {
    res.status(200).json({ message: "Order status updated successfully", order });
  }).catch((error) => {
    res.status(500).json({ message: "Error updating order status", error });
  });
}
function getAll4(req, res) {
  const providerId = req.user?.id;
  console.log("Orders getAll - req.user?.id:", req.user?.id);
  if (!providerId) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const skipPage = Math.max(1, parseInt(req.query.skip) || 1);
  const take = Math.min(50, parseInt(req.query.take) || 10);
  const skip = (skipPage - 1) * take;
  prisma.order.findMany({
    where: { Meal: { providerId } },
    include: { Meal: true, User: { select: { id: true, name: true, email: true } } },
    // Include User for customer info
    orderBy: { createdAt: "desc" },
    skip,
    take
  }).then((orders) => {
    res.json(orders);
  }).catch((error) => {
    res.status(500).json({ message: "Internal Server Error", error });
  });
}
var orders_default2 = { patchOrder, getAll: getAll4 };

// src/api/provider/meals/index.ts
import express12 from "express";

// src/api/provider/meals/meals.controller.ts
import "express";
var getAll5 = (req, res) => {
  const providerId = req.params.id;
  console.log(req);
  prisma.meal.findMany({
    where: {}
  }).then((meals) => {
    res.json(meals);
    console.log(meals);
  }).catch((error) => {
    res.status(500).json({ message: "Internal Server Error", error });
    console.log(error);
  });
};
var getOne4 = async (req, res) => {
  const mealId = req.params.id;
  try {
    const meal = await prisma.meal.findUnique({ where: { id: mealId } });
    if (meal) {
      res.status(200).json(meal);
    } else {
      res.status(404).json({ message: "Meal not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving meal", error });
  }
};
var create3 = async (req, res) => {
  const meal = req.body;
  const providerId = await req.user?.id;
  try {
    const newMeal = await prisma.meal.create({
      data: { ...meal, providerId }
    });
    console.log(newMeal);
    res.status(201).json({ message: "Meal created successfully", meal });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating meal", error });
  }
};
var updateOne = async (req, res) => {
  const mealId = req.params.id;
  const providerId = req.user?.id;
  const updatedData = req.body;
  try {
    const updatedMeal = await prisma.meal.update({
      where: { id: mealId, providerId },
      data: updatedData
    });
    res.status(200).json({ message: "Meal updated successfully", meal: updatedMeal });
  } catch (error) {
    res.status(500).json({ message: "Error updating meal", error });
  }
};
var deleteOne2 = async (req, res) => {
  const mealId = req.params.id;
  try {
    await prisma.meal.delete({ where: { id: mealId } });
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting meal", error });
  }
};
var meals_controller_default2 = { getAll: getAll5, create: create3, getOne: getOne4, updateOne, deleteOne: deleteOne2 };

// src/middlewares/authRole.ts
import "express";
var authRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
var authRole_default = authRole;

// src/api/provider/meals/index.ts
var router4 = express12.Router();
router4.post("/", authorize_default, authRole_default(["Provider"]), meals_controller_default2.create);
router4.get("/:id", meals_controller_default2.getAll);
router4.put("/:id", authorize_default, authRole_default(["Provider"]), meals_controller_default2.updateOne);
router4.delete("/:id", authorize_default, authRole_default(["Provider"]), meals_controller_default2.deleteOne);
router4.get("/:id", meals_controller_default2.getOne);
var meals_default2 = router4;

// src/api/provider/index.ts
var router5 = express13.Router();
router5.get("/:id", provider_controller_default.getOne);
router5.get("/", provider_controller_default.getAll);
router5.get("/orders", authorize_default, authRole_default(["Provider"]), orders_default2.getAll);
router5.patch(
  "/orders/:id",
  authorize_default,
  authRole_default(["Provider"]),
  orders_default2.patchOrder
);
router5.use("/meals", authorize_default, meals_default2);
router5.post("/", provider_controller_default.createOne);
var provider_default = router5;

// src/api/admin/index.ts
import express15 from "express";

// src/api/admin/admin.controller.ts
import "express";
function getUsers(req, res) {
  prisma.user.findMany({}).then((users) => {
    console.log(users);
    res.status(200).json(users);
  }).catch((error) => {
    res.status(500).json({ message: "Error retrieving users", error });
  });
}
var deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({ where: { id: String(id) } });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};
var updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: String(userId) },
      data: updatedData
    });
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};
var getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving orders", error });
  }
};
var admin_controller_default = { getUsers, deleteUser, updateUser, getAllOrders };

// src/api/admin/index.ts
var router6 = express15.Router();
router6.get("/users", admin_controller_default.getUsers);
router6.delete("/users/:id", admin_controller_default.deleteUser);
router6.put("/users/:id", admin_controller_default.updateUser);
router6.get("/orders", admin_controller_default.getAllOrders);
var admin_default = router6;

// src/api/review/index.ts
import express17 from "express";

// src/api/review/review.controller.ts
import "express";
var create4 = async (req, res) => {
  const review = req.body;
  const UserId = req.user?.id;
  try {
    const newReview = await prisma.review.create({
      data: { ...review, UserId }
    });
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating review", error });
  }
};
var getByProvider2 = async (req, res) => {
  const id = req.params.id;
  await prisma.review.findMany({
    where: { Meal: { providerId: id } },
    include: { Meal: true }
  }).then((reviews) => {
    res.json(reviews);
  }).catch((error) => {
    res.status(500).json({ message: "Internal Server Error", error });
  });
};
var review_controller_default = { create: create4, getByProvider: getByProvider2 };

// src/api/review/index.ts
var router7 = express17.Router();
router7.get("/", (req, res) => {
  res.send("Review Root");
});
router7.post("/", review_controller_default.create);
router7.get("/provider/:id", review_controller_default.getByProvider);
var review_default = router7;

// src/api/categories/index.ts
import express19 from "express";

// src/api/categories/categories.controller.ts
import "express";
var getAll6 = async (req, res) => {
  await prisma.category.findMany({
    where: {}
  }).then((categories) => {
    res.json(categories);
    console.log(categories);
  }).catch((error) => {
    res.status(500).json({ message: "Internal Server Error", error });
    console.log(error);
  });
};
var create5 = async (req, res) => {
  const category = req.body;
  console.log(req);
  try {
    const newCategory = await prisma.category.create({
      data: category
    });
    console.log(newCategory);
    res.status(201).json({
      message: "Category created successfully",
      category: newCategory
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating category", error });
  }
};
var deleteOne3 = async (req, res) => {
  const categoryId = req.params.id;
  try {
    await prisma.category.delete({ where: { id: categoryId } });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
    console.log(error);
  }
};
var categories_controller_default = { getAll: getAll6, create: create5, deleteOne: deleteOne3 };

// src/api/categories/index.ts
var router8 = express19.Router();
router8.get("/", categories_controller_default.getAll);
router8.post("/", categories_controller_default.create);
router8.delete("/:id", categories_controller_default.deleteOne);
var categories_default = router8;

// src/index.ts
var router9 = express20.Router();
router9.get("/", (req, res) => {
  res.send("API Root");
});
router9.use("/meals", meals_default);
router9.use("/orders", authorize_default, orders_default);
router9.use("/cart", authorize_default, cart_default);
router9.use("/review", authorize_default, review_default);
router9.use("/providers", provider_default);
router9.use("/admin", admin_default);
router9.use("/categories", categories_default);
var src_default = router9;

// index.ts
import { toNodeHandler } from "better-auth/node";
dotenv2.config();
var app = express21();
var allowedOrigins = [
  process.env.ORIGIN_URL || "http://localhost:5000"
].filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"]
  })
);
app.use(express21.json());
var PORT = process.env.PORT || 8e3;
app.all("/api/auth/*splat", toNodeHandler(auth));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api", src_default);
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
var index_default = app;
export {
  index_default as default
};
