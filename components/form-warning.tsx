import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormWarningProps {
    message?: string;
};

export const FormWarning = ({ message }: FormWarningProps) => {

    if (!message) {
        return null
    }
    return (
        <div className="bg-[#f5ee31]/65 p-3 rounded-md flex items-center gap-x-2 text-sm text-yellow">
            <ExclamationTriangleIcon className='h-4 w-4'/>
            <p>{message}</p>
        </div>
    )
}