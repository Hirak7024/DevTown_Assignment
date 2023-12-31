import styled from "styled-components";

const Pagination = ({ page, pages, changePage }) => {
    let middlePagination;

    if (pages < 5) {
        middlePagination = [...Array(pages)].map((_, idx) => (
            <button
                key={idx + 1}
                onClick={() => changePage(idx + 1)}
                disabled={page === idx + 1}
            >
                {idx + 1}
            </button>
        ));
    } else {
        const startValue = Math.floor((page - 1) / 5) * 5;

        middlePagination = (
            <>
                {[...Array(5)].map((_, idx) => (
                    <button
                        key={startValue + idx + 1}
                        disabled={page === startValue + idx + 1}
                        onClick={() => changePage(startValue + idx + 1)}
                    >
                        {startValue + idx + 1}
                    </button>
                ))}

                <button onClick={() => changePage(page + 1)}>...</button>
                <button onClick={() => changePage(pages)}>{pages}</button>
            </>
        );

        if (page > 5) {  //if current page > 5
            if (pages - page >= 5) {
                middlePagination = (
                    <>
                        <button onClick={() => changePage(1)}>1</button>
                        <button onClick={() => changePage(page - 1)}>...</button>
                        <button onClick={() => changePage(startValue)}>{startValue}</button>
                        {[...Array(5)].map((_, idx) => (
                            <button
                                key={startValue + idx + 1}
                                disabled={page === startValue + idx + 1}
                                onClick={() => changePage(startValue + idx + 1)}
                            >
                                {startValue + idx + 1}
                            </button>
                        ))}

                        <button onClick={() => changePage(page + 1)}>...</button>
                        <button onClick={() => changePage(pages)}>{pages}</button>
                    </>
                );
            } else {
                let amountLeft = pages - page + 5;
                middlePagination = (
                    <>
                        <button onClick={() => changePage(1)}>1</button>
                        <button>...</button>
                        <button onClick={() => changePage(startValue)}>{startValue}</button>
                        {[...Array(amountLeft)].map((_, idx) => (
                            <button
                                key={startValue + idx + 1}
                                disabled={page === startValue + idx + 1}
                                style={
                                    pages < startValue + idx + 1 ? { display: "none" } : null
                                }
                                onClick={() => changePage(startValue + idx + 1)}
                            >
                                {startValue + idx + 1}
                            </button>
                        ))}
                    </>
                );
            }
        }
    }

    return (
        <PaginationWrapper>
            {pages > 1 && (
                <div className="pagination">
                    <button  //Previous Button
                        className="pagination__prev"
                        onClick={() => changePage((page) => page - 1)}  //here changePage is the setPage function from App.js that is used to set the state variable "page".
                        disabled={page === 1}
                    >
                        &#171;
                    </button>
                    {middlePagination}
                    <button  //Next Button
                        className="pagination__next"
                        onClick={() => changePage((page) => page + 1)}
                        disabled={page === pages}
                    >
                        &#187;
                    </button>
                </div>
            )}
        </PaginationWrapper>
    );
};

const PaginationWrapper = styled.div`
    .pagination {
    padding-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 2rem;
    width: fit-content;
  }
  
  .pagination button {
    margin-right: 0.5rem;
    cursor: pointer;
    padding: 7px 15px;
  }
  
  .pagination button:disabled {
    background-color: #333;
    color: #fff;
    cursor: not-allowed;
  }
`

export default Pagination;