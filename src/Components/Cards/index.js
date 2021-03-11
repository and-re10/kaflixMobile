import React from 'react'
import { Card, Name } from './styles'

export default function Cards(props) {
    return (
        <Card style={{backgroundColor: props.cardColor}}>
            <Name>{props.userName}</Name>
        </Card>
    )
}

