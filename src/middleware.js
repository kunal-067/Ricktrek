import {
    cookies
} from 'next/headers';
import {
    NextResponse
} from 'next/server'
import {
    verifyToken
} from './utils/api/jwt.utils';


export async function middleware(req) {
    try {
        const requestedPath = req.nextUrl.pathname;
        const data = decodeToken(req);

        if (requestedPath.includes('/api/admin')) await checkAdmin(data)
        
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('userId', data?.userId)

        const response = NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })

        return response

    } catch (error) {
        console.error('error in middleware', error)
        return NextResponse.json({
            msg: 'internal server error ! please try later',
            error: error.message
        }, {
            status: 500
        })
    }
}

const decodeToken = (req) => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get('jwt');

        if (!token) {
            return NextResponse.json({
                msg: 'invalid user ! token not found, login again'
            }, {
                status: 404
            })
        }

        const tokenData = verifyToken(token)
        
        return tokenData;

    } catch (error) {
        // console.error('decode token err', error)
        throw new Error({
            message: 'error in decoding user data in middleware',
            error
        })
    }
}

export const config = {
    matcher: '/:path*',
}