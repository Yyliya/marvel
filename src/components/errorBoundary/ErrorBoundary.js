import { Component } from "react/cjs/react.development";
import ErrorMessage from "../errorMessage/errorMessage";


class ErrorBoundary extends Component {
    state = {
        error: false
    }

    componentDidCatch(err, info) {
        console.log(err, info)
        this.setState({error: true})
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }

        return this.props.children;
    }
}
export default ErrorBoundary;