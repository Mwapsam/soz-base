import React, {useState, useEffect, Fragment} from "react";
import StarRatings from 'react-star-ratings';
import { useDispatch } from "react-redux";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip
  } from "@material-tailwind/react";
import useUser from "../../pages/hooks/useUser";
import { addReview } from "../../services/review.service";


  function getScreenSize() {
    const width = window.innerWidth;
    if (width <= 600) {
      return 'xl';
    } else {
      return 'md';
    }
  }
 
const Review = ({productId}) => {
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState();
  const [ratings, setRatings] = useState(0);
  const handleOpen = () => setOpen((cur) => !cur);

  const [dialogSize, setDialogSize] = useState(getScreenSize());

  const {user} = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setDialogSize(getScreenSize());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const changeRating = (rates) => {
    setRatings(rates);
  }  

  const onSubmitReview = () => {
    const reviews = {
      rating: ratings,
      product_id: productId,
      user_id: user && user.id,
      comment, 
    }    
    dispatch(addReview(reviews))
  }

  return (
    <Fragment>
        {user ? (<Button onClick={handleOpen} style={{ borderRadius: 0 }} className="flex items-center gap-3 bg-gray-900">
            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg> Review
        </Button>) : 
        (
            <Tooltip content="You need to login to give feedback">
                <Button disabled onClick={handleOpen} style={{ borderRadius: 0 }} className="flex items-center gap-3 bg-gray-800">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg> Review
                </Button>
            </Tooltip>

        )
        }
      <Dialog open={open} handler={handleOpen} size={dialogSize}>
        <DialogHeader>Give Us Feedback</DialogHeader>
        <DialogBody divider>
            <div className="flex flex-col bg-white px-8 lg:px-16 py-14 rounded-md text-center">
                <h1 className="text-xl mb-4 font-bold text-slate-500">How many stars?</h1>
                <StarRatings
                        rating={ratings}
                        starRatedColor={'orange'}
                        changeRating={changeRating}
                        starDimension="20px"
                        starSpacing="2px"
                />
                <div className='pt-3'>
                    <textarea onChange={(e) => setComment(e.target.value)} placeholder="Comment" className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-600 bg-white px-5 py-2.5 text-gray-700 focus:border-gray-900 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 dark:border-gray-400 dark:bg-gray-100 dark:text-gray-900 dark:focus:border-gray-300" />
                    <p className="mt-3 text-xs text-gray-900">Please leave a comment on how you feel about this piece of art.</p>
                </div>
            </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={onSubmitReview}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}

export default Review;