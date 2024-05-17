import express from 'express';
import axios from 'axios';
import cors from 'cors';

const allowedOrigins = ['http://localhost:5173']

const productNames = {
    "060300": "포도",
    "061400": "감귤",
    "065900": "블루베리",
    "080200": "참외",
    "080300": "토마토",
    "080400": "딸기",
    "080500": "멜론",
    "080600": "방울토마토",
    "090100": "오이",
    "090200": "호박",
    "090300": "가지",
    "100500": "상추",
    "100800": "시금치",
    "120500": "풋고추",
    "132600": "파프리카",
    "150400": "기타",
    "170000": "버섯",
    "230000": "다육이",
    "237900": "선인장",
    "26E800": "국화",
    "ETC102": "기타",
    "ETC105": "기타",
}

const app = express();
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS!'))
        }
    }
}));

app.get("/getIdentityDataList/:key", async (req, res) => {
    try {
        const { key } = req.params;
        const response = await axios.get(`http://www.smartfarmkorea.net/Agree_WS/webservices/ProvideRestService/getIdentityDataList/${key}`);
        const data = response.data;

        const returnData = data.map(item => {
            // console.log(productNames[item.itemCode], item.itemCode)
            return {
                userId: item.userId,
                facilityId: item.facilityId,
                product: productNames[item.itemCode],
                addressName: item.addressName,
            }
        })

        // console.log(jsonData);
        // console.log(response.data);
        res.status(200).json(returnData);
    } catch (err) {
        res.status(500).json({ error: "Failed" })
    }
})

const port = 3000;

app.listen(port, () => {
    console.log(`Server Start!`)
})