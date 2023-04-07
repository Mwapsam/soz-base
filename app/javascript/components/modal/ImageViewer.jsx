import React from "react";
import {
  Dialog,
  DialogBody,
  Card,
} from "@material-tailwind/react";
 
const ImageViewer = ({ photo, name }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
 
  return (
    <React.Fragment>
      <Card
        className="w-full lg:w-[30rem] lg:h-[20rem] cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
        onClick={handleOpen}
        style={{ borderRadius: 0 }}
      >
        <img
          alt={name}
          className="h-full w-full object-center"
          src={ photo }
        />
      </Card>
      <Dialog size="xl" open={open} handler={handleOpen}>
        <DialogBody divider={true} className="p-0">
          <img
            alt={name}
            className="h-full lg:h-[40rem] w-full"
            src={ photo }
          />
        </DialogBody>
      </Dialog>
    </React.Fragment>
  );
}

export default ImageViewer;