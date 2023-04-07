import React, { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
const About = () => {
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <Fragment>
      <Button onClick={handleOpen} size="xl" style={{borderRadius: 0}} color="white" className="mt-5 mb-3">
        Learn More
      </Button>
      <Dialog
        size={"xl"}
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        style={{borderRadius: 0}}
        className="h-full overflow-scroll py-4"
      >
        <DialogHeader className="text-center uppercase">About Stone of Zimbabwe</DialogHeader>
        <DialogBody divider>
            Headquartered in Harare with support from Berlin and London, Stones of Zimbabwe is passionate about promoting the work of some of the finest Zimbabwean sculptors. By hosting exhibitions around the world and offering sculptures for sale online, we let you experience some of the finest contemporary stone sculptures. As part of our mission, we give relief to people living in the worst distress and hardship lives so that they may have the opportunity to develop and live fulfilling and worthwhile lives.
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

export default About;