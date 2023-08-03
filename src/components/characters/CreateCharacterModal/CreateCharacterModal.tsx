"use client";
import { Button, Slide } from "@mui/material";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { TextInput } from "../../Global/Form/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./CreateCharacterModal.module.css";
import { z } from "zod";
import { mutate } from "swr";
import { getUseLoadCharactersKey } from "@/hooks/useLoadCharacters";
import { CreateDialog } from "@/components/CreateDialog/CreateDialog";

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
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(CharacterDataValidation),
  });

  const handleClose = () => setOpen(false);

  const onNewCharacterSubmit = async (data: any, callback: () => void) => {
    fetch("/api/characters", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        mutate(getUseLoadCharactersKey());
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Button variant="contained" color="success" type="button" onClick={() => setOpen(true)}>
        +
      </Button>
      <CreateDialog DataValidation={CharacterDataValidation} title="Create new character" onSubmit={onNewCharacterSubmit}>
        <div className={styles.fields_group}>
          <TextInput id="name" name="name" label="Name" />
          <TextInput id="description" name="description" label="Description" multiline />
        </div>
      </CreateDialog>
    </div>
  );
};
