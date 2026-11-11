import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import employeesData from "../src/data/employees.json";
import rolesData from "../src/data/roles.json";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed departments
  const departments = [
    ...new Set(employeesData.map((employee) => employee.department)),
  ];

  for (const departmentName of departments) {
    await prisma.department.upsert({
      where: { name: departmentName },
      update: {},
      create: { name: departmentName },
    });
  }

  // Seed employees
  for (const employee of employeesData) {
    const department = await prisma.department.findUnique({
      where: { name: employee.department },
    });

    if (!department) {
      throw new Error(`Department not found: ${employee.department}`);
    }

    await prisma.employee.create({
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName,
        departmentId: department.id,
      },
    });
  }

  // Seed roles
  for (const role of rolesData) {
    await prisma.role.create({
      data: {
        firstName: role.firstName,
        lastName: role.lastName,
        role: role.role,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });