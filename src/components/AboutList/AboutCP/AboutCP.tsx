import './AboutCP.css';
import { Card, Typography, Divider } from "antd";

const { Title, Text } = Typography;

const AboutCP =  ()=>{
return (
    <div className="aboutcp">
    <div className="banner">
     <div className="banner-img">
         <img src="https://crm.flesta.vn//uploads/about_us/ISN-JUTEC.png" alt="" />
         <div className="banner-des">Hồ sơ công ty</div>
     </div>
    </div>
    <div className="description-box" >
    <Card title={<span style={{ fontSize: '24px' }}>Công ty trách nhiệm hữu hạn ISN - JUTEC</span>} bordered={false} style={{ width: 1000 }}>
     <div className="info-pair">
       <Title level={5}>Thương hiệu</Title>
       <Text>FLESTA</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Mô tả doanh nghiệp</Title>
       <Text>
         1. Cho thuê căn hộ và văn phòng dịch vụ<br />
         2. Quản lý căn hộ<br />
         3. Nhập khẩu và phân phối vật liệu nhà ở
       </Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Đại diện pháp lý</Title>
       <Text>Ông Nguyễn Hà Hưng<br />Ông Eto Shinji</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Ngày thành lập</Title>
       <Text>05/2020</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Vốn điều lệ</Title>
       <Text>20,000,000,000 VND</Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Trụ sở chính</Title>
       <Text>
         Tầng 9, Tòa nhà VIT, 56 519 Kim Mã, Quận Ba Đình, Hà Nội, Việt Nam<br />
         Điện thoại: (84) 024 2220 8811
       </Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Chi nhánh Hồ Chí Minh</Title>
       <Text>
         Tầng 7, Vietnam Business Center, số 57-59 Hồ Tùng Mậu, Quận 1, Thành phố Hồ Chí Minh<br />
         Điện thoại: (84) 028 3821 1869
       </Text>
     </div>
     <Divider />

     <div className="info-pair">
       <Title level={5}>Mã số thuế</Title>
       <Text>0108484927</Text>
     </div>
 </Card>
    </div>
</div>
)
}
export default AboutCP;