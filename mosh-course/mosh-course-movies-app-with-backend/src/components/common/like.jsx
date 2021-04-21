const Like = ({ liked, onClick }) => {
    let classes = "";
    if (liked) {
        classes += "fas";
    } else {
        classes += "far";
    }
    classes += " fa-heart clickable";

    return <i className={classes} onClick={onClick}></i>;
};

export default Like;
