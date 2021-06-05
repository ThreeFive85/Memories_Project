import jwt from 'jsonwebtoken';
import secret from '../../jwtSecret.js';

// 만약 게시물에 좋아요를 누르고 싶다면
// 먼저 like 버튼을 누르면 이벤트가 발생하고 좋아요를 누를 수 있는 권한이 있는지를 미들웨어에서 확인해야한다.
// 확인이 되면 like controller로 넘어간다.
// click the like button => auth middleware (next) => like controller ...

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodeData;

        if(token && isCustomAuth){
            decodeData = jwt.verify(token, secret);

            req.userId = decodeData?.id;
        } else {
            decodeData = jwt.decode(token);
            req.userId = decodeData?.sub;
        }
        
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth;