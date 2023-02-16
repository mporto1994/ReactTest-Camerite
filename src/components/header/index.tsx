import "./styles.css" 

export const Header = (props) => {
    return(
        <div className="bar">
            {props.children}
        </div>
    )
}