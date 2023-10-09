"use client";
import { mutate } from "swr";
import { z } from "zod";

import { CreateDialog } from "@/components/CreateDialog/CreateDialog";
import { TextInput } from "@/components/Global/Form/TextInput/TextInput";
import styles from "./CreateCharacterModal.module.css";

const CharacterDataValidation = z.object({
  name: z.string().nonempty("Field is required"),
  description: z.string().nonempty("Field is required"),
  imageUrl: z.string().optional(),
});

export const CreateCharacterModal = () => {
  const onNewCharacterSubmit = async (data: any, callback: () => void) => {
    fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        mutate((key) => typeof key === "string" && key.startsWith("useLoadCharacters"));
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <CreateDialog DataValidation={CharacterDataValidation} title="Create new character" onSubmit={onNewCharacterSubmit}>
      <div className={styles.fields_group}>
        <TextInput id="name" name="name" label="Name" />
        <TextInput id="description" name="description" label="Description" multiline />
      </div>
    </CreateDialog>
  );
};
