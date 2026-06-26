import React from "react"

type Props = {
    children: React.ReactNode
    fallback: React.ReactNode
}

type State = {
    hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
    state = { hasError: false }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error: Error) {
        console.error(error)
    }

    render() {
        if (this.state.hasError) return this.props.fallback
        return this.props.children
    }
}

export default ErrorBoundary