import React, { Component } from 'react'

class Dashboard extends Component {

    constructor() {
        super()

        this.state = {
            dumpIpmsum: [
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                'Ut a sem eu orci imperdiet tincidunt ut tempor sem.',
                'Integer ornare dictum tortor mattis dapibus.',
                'Donec sit amet sagittis ligula.'
            ]
        }

    }


    render() {
        return(
            <div>
                <div>itens</div>
                <div>
                    <h1>DASHBOARD</h1>
                    <p>
                        {JSON.stringify(this.state)}
                    </p>
                </div>

            </div>
        )
    }


} export default Dashboard