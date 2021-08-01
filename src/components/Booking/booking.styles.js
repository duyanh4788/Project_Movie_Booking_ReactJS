export const styled = (theme) => ({
    choiceChair: {
        backgroundColor: "rgb(109, 238, 109)",
        color: "white",
        fontSize: "10px",
        width: "25px",
        height: "25px",
        border: "none",
        outline: "none",
        marginLeft: "1%",
        marginBottom: "1%",
        borderRadius: "5px",
        fontWeight: "500",
    },
    unChoiceChair: {
        backgroundColor: "#3e515d",
        color: "#3e515d",
        fontSize: "10px",
        width: "25px",
        height: "25px",
        border: "none",
        outline: "none",
        marginLeft: "1%",
        marginBottom: "1%",
        borderRadius: "5px",
        fontWeight: "500",
    },
    bookingChair: {
        backgroundColor: "rgba(16, 34, 53, 0.2)",
        color: "rgba(16, 34, 53, 0.2)",
        fontSize: "10px",
        width: "25px",
        height: "25px",
        border: "none",
        outline: "none",
        marginLeft: "1%",
        marginBottom: "1%",
        borderRadius: "5px",
        fontWeight: "500",
    },
    pading: {
        padding: theme.spacing(1),
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        display: 'flex',
        justifyContent: "center",
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(30),
            height: theme.spacing(10),
        },
    },
    media: {
        height: 200,
    },
    carContent: {
        lineHeight: "30px",
    }
})

