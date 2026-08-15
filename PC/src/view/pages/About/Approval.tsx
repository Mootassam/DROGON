import React from 'react'
import SubHeader from 'src/view/shared/Header/SubHeader'

function Approval() {
    return (
        <div className='container'>
           <SubHeader title="Certificate" />
            <img src="/images/certif.png" alt=""  className='certif'/>
            <style>{`
            .certif { width:100%}
            `}</style>
        </div>
    )
}

export default Approval