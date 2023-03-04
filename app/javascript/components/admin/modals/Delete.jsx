import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const Delete = ({openDelete, handleOpenDelete, productName}) => {
    console.log(productName);
  return (
    <>  
    <Fragment>
      <Dialog
        open={openDelete}
        handler={handleOpenDelete}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size={"lg"}
      >
        <DialogHeader className="text-xl mb-4 font-bold text-black text-center">Do you Want Delete {productName}?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpenDelete}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="gray" onClick={handleOpenDelete}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
    
    </>
  )
}

export default Delete;