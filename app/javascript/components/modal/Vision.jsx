import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Vision = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  const getSize = () => {
    if (window.innerWidth < 768) {
      return "xl"; // Use 'md' size for smaller screens
    } else {
      return "md"; // Use 'xl' size for larger screens
    }
  };

  return (
    <Fragment>
      <Button
        onClick={handleOpen}
        style={{ borderRadius: 0, backgroundColor: "black" }}
      >
        Read More
      </Button>
      <Dialog
        size={getSize()}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{ borderRadius: 0 }}
        className="h-full lg:h-[28rem] overflow-scroll py-4"
      >
        <DialogHeader className="text-center uppercase">Our Vision</DialogHeader>
        <DialogBody divider>
          We exist to improve the quality of life for the Tengenenge villagers by promoting the sale of their stone sculptures within the global market. We envision to transform lives through economic empowerment and international development by working collaboratively as a missionary project to enhance lives within the village. We implement infrastructure initiatives through installing solar power systems, set up running water to bring clean and safe drinking supplies, create irrigation schemes to boost agricultural food production to feed the community, and support the life changing building of a local school. We contribute to the improvement of housing and the creation of a visitor hub that connects cultures, where people can learn the art of stone sculpting using traditional methods alongside indigenous master carvers.
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default Vision;
