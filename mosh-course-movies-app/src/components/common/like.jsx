const Like = (props) => {
    let classes = "";
    if (props.liked) {
        classes += "fas";
    } else {
        classes += "far";
    }
    classes += " fa-heart cursor-pointer";

    return <i className={classes} onClick={props.onClick}></i>;
};

export default Like;
