import React from 'react';
import QRCode from 'react-qr-code';

function Payment({searchParams}) {
    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Payable Amount: ₹{searchParams.amount || 0}</h1>
                <h1 className="text-2xl font-bold mb-4">Scan QR Code to Pay</h1>
                <QRCode value={`upi://pay?pa=richtrek@axl`} size={256} /> <br /><br />
                <b>OR, Pay on following UPI Id :</b>
                <p className="mt-4">richtrek@axl</p>
            </div>
        </>
    )
}

export default Payment