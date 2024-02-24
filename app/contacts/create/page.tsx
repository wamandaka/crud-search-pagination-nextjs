import CreateForm from "@/components/create-form";
import React from "react";

const CreateContactPage = () => {
  return (
    <div className="max-w-md mx-auto content-center grid h-screen">
      <h1 className="text-2xl text-center mb-2">Add new contact</h1>
      <CreateForm />
    </div>
  );
};

export default CreateContactPage;
