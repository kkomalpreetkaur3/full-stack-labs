import { useState } from 'react'

export function useFormInput(initialValue: string) {
    const [value, setValue] = useState(initialValue)
    const [messages, setMessages] = useState<string[]>([])

    function validate(
        validationCallback: (value: string) => string[]
    ): boolean {
        const validationMessages = validationCallback(value)

        setMessages(validationMessages)

        return validationMessages.length === 0
    }

    function reset() {
        setValue(initialValue)
        setMessages([])
    }

    return {
        value,
        setValue,
        messages,
        setMessages,
        validate,
        reset
    }
}