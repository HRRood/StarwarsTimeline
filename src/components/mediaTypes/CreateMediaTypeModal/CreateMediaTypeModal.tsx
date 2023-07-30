"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { TextInput } from "../../Global/Form/TextInput/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./CreateMediaTypeModal.module.css";
import { z } from "zod";
import { mutate } from "swr";
import { getUseLoadMediaTypesKey } from "@/hooks/useLoadMediaTypes";

const DataValidation = z.object({
  name: z.string().nonempty("Field is required"),
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CreateMediaTypeModal = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(DataValidation),
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
              fetch("/api/mediaTypes", {
                method: "POST",
                body: JSON.stringify(data),
              })
                .then((res) => {
                  mutate(getUseLoadMediaTypesKey());
                  handleClose();
                })
                .catch((err) => {
                  console.log(err);
                });
            })}
          >
            <DialogTitle>Create new media type</DialogTitle>
            <DialogContent>
              <div className={styles.fields_group}>
                <TextInput id="name" name="name" label="Name" />
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
