"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { TextInput } from "../Form/TextInput/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./CreateCharacterModal.module.css";
import { z } from "zod";
import { mutate } from "swr";
import { getUseLoadCharactersKey } from "@/hooks/useLoadCharacters";

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
  return (
    <div>
      <Button variant="contained" color="success" type="button" onClick={() => setOpen(true)}>
        +
      </Button>
      <Dialog open={open} TransitionComponent={Transition} maxWidth="md" fullWidth onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              fetch("/api/characters", {
                method: "POST",
                body: JSON.stringify(data),
              })
                .then((res) => {
                  mutate(getUseLoadCharactersKey());
                  handleClose();
                })
                .catch((err) => {
                  console.log(err);
                });
            })}
          >
            <DialogTitle>Create new character</DialogTitle>
            <DialogContent>
              <div className={styles.fields_group}>
                <TextInput id="name" name="name" label="Name" />
                <TextInput id="description" name="description" label="Description" multiline />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </form>
        </FormProvider>
      </Dialog>
    </div>
  );
};
