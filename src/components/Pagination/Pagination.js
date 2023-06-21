import React, { useState } from "react";
// import Button from "@material-ui/core/Button";
import "./Pagination.css";
// import { blueGrey } from "@material-ui/core/colors";
// import { withStyles } from "@material-ui/core/styles";

// const ColorButton = withStyles((theme) => ({
//   root: {
//     marginLeft: 3,
//     marginRight: 3,
//     color: theme.palette.getContrastText(blueGrey[500]),
//     backgroundColor: "transparent",
//     "&:hover": {
//       backgroundColor: blueGrey[700],
//     },
//   },
// }))(Button);

const Pagination = ({ cardsPerPage, totalcards, paginate, currentPage }) => {
    // console.log("currentPage", currentPage)
    // console.log("totalcards", totalcards)
    // console.log("cardsPerPage", cardsPerPage)
    // console.log("paginate", paginate)
    const [TempPage, setTempPage] = useState(currentPage);
    const [PageNumberLimit] = useState(5);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(Math.floor((currentPage - 1) / PageNumberLimit) * PageNumberLimit);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(Math.ceil((currentPage) / PageNumberLimit) * PageNumberLimit);
    const pageNumbers = [];

    React.useEffect(() => {
        setminPageNumberLimit(Math.floor((currentPage - 1) / PageNumberLimit) * PageNumberLimit);
        setmaxPageNumberLimit(Math.ceil((currentPage) / PageNumberLimit) * PageNumberLimit);
    }, [currentPage])

    for (let i = 1; i <= Math.ceil(totalcards / cardsPerPage); i++) {
        pageNumbers.push(i);
    }
    const handlePrevbtn = (number) => {
        callPaginate(number - 1);
        if ((number - 1) % PageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - PageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - PageNumberLimit);
        }
    };
    const handleNextbtn = (number) => {
        callPaginate(number + 1);
        if (number + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + PageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + PageNumberLimit);
        }
    };
    const handleIncrease = () => {
        setmaxPageNumberLimit(maxPageNumberLimit + PageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit + PageNumberLimit);
        setTempPage(TempPage + 5);
    };
    const handleDecrease = () => {
        setmaxPageNumberLimit(maxPageNumberLimit - PageNumberLimit);
        setminPageNumberLimit(minPageNumberLimit - PageNumberLimit);
        setTempPage(TempPage - 5);
    };
    const handleFirstJump = (number) => {
        setmaxPageNumberLimit(number + 4);
        setminPageNumberLimit(number - 1);
        callPaginate(number);
    };
    const handleLastJump = (number) => {
        setmaxPageNumberLimit(number);
        setminPageNumberLimit(number - (pageNumbers.length % PageNumberLimit));
        callPaginate(number);
    };

    const callPaginate = (number) => {
        setTempPage(number);
        paginate(number);
    };
    let firstButton = null;
    if (TempPage >= 6) {
        firstButton = (
            <div className="pagination__btn"
                onClick={() => handleFirstJump(pageNumbers[0])}
            >
                {pageNumbers[0]}
            </div>
        );
    }

    let lastButton = null;
    if (TempPage < (pageNumbers.length - (pageNumbers.length % PageNumberLimit))) {
        lastButton = (
            <div className="pagination__btn"
                onClick={() => handleLastJump(pageNumbers[pageNumbers.length - 1])}
            >
                {pageNumbers[pageNumbers.length - 1]}
            </div>
        );
    }

    let pageIncrementBtn = null;
    if (pageNumbers.length - 1 > maxPageNumberLimit) {
        pageIncrementBtn = (
            <div className="pagination__btn__disabled"
                disabled={
                    TempPage === pageNumbers[pageNumbers.length - 1] ? true : false
                }
                onClick={() => handleIncrease()}
            >
                &hellip;
            </div>
        );
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = (
            <div className="pagination__btn"
                onClick={() => handleDecrease()}
            >
                &hellip;
            </div>
        );
    }
    const RenderPag = pageNumbers.map((number) => {
        // console.log("max : " + maxPageNumberLimit)
        // console.log("min : " + minPageNumberLimit)
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <div className="pagination__btn"
                    style={currentPage === number ? {backgroundColor: "#3f51b5"} : {outline: "none"}}
                    onClick={() => callPaginate(number)}
                >
                    {number}
                </div>
            );
        } else {
            return null;
        }
    });
    if ((totalcards !== 0))
        return (
            <div>
                <div className="pagination">
                    <div className="pagination__btn__disabled"
                        disabled={currentPage === pageNumbers[0] ? true : false}
                        onClick={() => handlePrevbtn(currentPage)}
                    >
                        Previous
                    </div>
                    {firstButton}
                    {pageDecrementBtn}
                    {RenderPag}
                    {pageIncrementBtn}
                    {lastButton}
                    <div className="pagination__btn__disabled"
                        disabled={
                            currentPage === pageNumbers[pageNumbers.length - 1] ? true : false
                        }
                        onClick={() => handleNextbtn(currentPage)}
                    >
                        Next
                    </div>
                </div>
            </div>
        );
};

export default Pagination;
