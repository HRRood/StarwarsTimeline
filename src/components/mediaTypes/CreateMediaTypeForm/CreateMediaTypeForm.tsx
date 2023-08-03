"use client";
import { TextInput } from "@/components/Global/Form/TextInput/TextInput";
import { CreateDialog } from "@/components/CreateDialog/CreateDialog";
import { mutate } from "swr";
import { getUseLoadMediaTypesKey } from "@/hooks/useLoadMediaTypes";
import { z } from "zod";
import styles from "./CreateMediaTypeForm.module.css";

const DataValidation = z.object({
  name: z.string().nonempty("Field is required"),
});

export const CreateMediaTypeForm = () => {
  const onNewMediaTypeSubmit = async (data: any, callback: () => void) => {
    fetch("/api/mediaTypes", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        mutate(getUseLoadMediaTypesKey());
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CreateDialog DataValidation={DataValidation} title="Create new Media type" onSubmit={onNewMediaTypeSubmit}>
      <div className={styles.fields_group}>
        <TextInput id="name" name="name" label="Name" />
      </div>
    </CreateDialog>
  );
};
