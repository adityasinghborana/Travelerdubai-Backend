const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GetStaticData = {
  async GetFooterData() {
    try {
      const data = await prisma.Footer.findFirst();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async GetContactUs() {
    console.log("hello");
    try {
      return await prisma.ContactUs.findFirst();
    } catch (e) {
      console.log(e);
    }
  },
  async GetExperiences() {
    try {
      const data = await prisma.Experiences.findFirst();
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async GetFormSubmission() {
    try {
      const data = await prisma.FormSubmission.findMany();

      return data;
    } catch (e) {
      console.log(e);
    }
  },

  async UpdateFooterData(updatedData) {
    try {
      const data = await prisma.Footer.update({
        where: { id: updatedData.id }, // Assuming id is the primary key
        data: updatedData,
      });
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async UpdateContactUs(updatedData) {
    try {
      const data = await prisma.ContactUs.update({
        where: { id: updatedData.id }, // Assuming id is the primary key
        data: updatedData,
      });
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },

  async UpdateExperiences(updatedData) {
    try {
      const data = await prisma.Experiences.update({
        where: { id: updatedData.id }, // Assuming id is the primary key
        data: updatedData,
      });
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  async CreateFormSubmission(formSubmissionData) {
    try {
      const data = await prisma.FormSubmission.create({
        data: formSubmissionData,
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = GetStaticData;
