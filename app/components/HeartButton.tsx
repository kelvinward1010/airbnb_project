'use client'

import { HeartOutlined } from "@ant-design/icons"

export const HeartButton: React.FC = () => {
    return (
        <div
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <HeartOutlined />
        </div>
    )
}