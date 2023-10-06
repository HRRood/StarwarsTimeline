"use client";
import { Slide } from "@mui/material";
import { forwardRef } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { TextInput } from "../../Global/Form/TextInput/TextInput";

import styles from "./CreateCharacterModal.module.css";
import { z } from "zod";
import { getUseLoadCharactersKey, useLoadCharacters } from "@/hooks/useLoadCharacters";
import { CreateDialog } from "@/components/CreateDialog/CreateDialog";
import { mutate } from "swr";

const CharacterDataValidation = z.object({
  name: z.string().nonempty("Field is required"),
  description: z.string().nonempty("Field is required"),
  imageUrl: z.string().optional(),
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
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
