"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { forwardRef, useState } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { TextInput } from "../../Global/Form/TextInput/TextInput";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import styles from "./CreateEventModal.module.css";
import { z } from "zod";
import { mutate } from "swr";
import { getUseLoadEventsKey } from "@/hooks/useLoadEvents";

const EventsDataValidation = z.object({
  title: z.string().nonempty("Field is required"),
  description: z.string().nonempty("Field is required"),
  fromDate: z
    .string()
    .nonempty("Field is required")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  toDate: z
    .string()
    .nonempty("Field is required")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
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

export const CreateEventModal = () => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(EventsDataValidation),
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
              fetch("/api/events", {
                method: "POST",
                body: JSON.stringify(data),
              })
                .then((res) => {
                  mutate(getUseLoadEventsKey());
                  handleClose();
                })
                .catch((err) => {
                  console.log(err);
                });
            })}
          >
            <DialogTitle>Create new event</DialogTitle>
            <DialogContent>
              <div className={styles.fields_group}>
                <TextInput id="title" name="title" label="Title" />
                <TextInput id="description" name="description" label="Description" multiline />
              </div>
              <div className={styles.fields_group}>
                <TextInput id="fromDate" name="fromDate" label="From Date" type="number" />
                <TextInput id="toDate" name="toDate" label="To Date" type="number" />
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
