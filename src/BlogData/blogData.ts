export interface Blog {
  id: string;
  title: string;
  date: string;
  views: number;
  image: string;
  description: string;
  content: string;
  gallery: string[];
}

export const blogData = [
  {
    id: "1",
    title: "Kinh nghiệm du lịch Hạ Long 2025 chi tiết từ A-Z",
    date: "23-10-2023",
    views: 320,
    image: "https://i.ibb.co/N2Rs9wjR/image.png",
    description:
      "Khám phá vẻ đẹp của Vịnh Hạ Long, trải nghiệm du thuyền sang trọng, thưởng thức ẩm thực biển tươi ngon, check-in những địa điểm nổi tiếng và tận hưởng kỳ nghỉ tuyệt vời cùng gia đình, bạn bè. Bài viết cung cấp thông tin chi tiết về lịch trình, phương tiện di chuyển, các hoạt động giải trí, lưu ý khi đi du lịch và những mẹo nhỏ giúp chuyến đi của bạn trọn vẹn hơn.",
    content: `
      <h2>Vịnh Hạ Long – Viên ngọc của miền Bắc</h2>
      <p>Không chỉ là kỳ quan thiên nhiên, Hạ Long còn là một bản tình ca của sóng, đá và trời. Nơi đây sở hữu hàng nghìn hòn đảo lớn nhỏ, tạo nên khung cảnh kỳ vĩ, thơ mộng và huyền bí. Du khách có thể lựa chọn tham quan vịnh bằng tàu, du thuyền hoặc chèo kayak để cảm nhận trọn vẹn vẻ đẹp của thiên nhiên. Mỗi sáng thức dậy trên vịnh, bạn sẽ được đón ánh bình minh rực rỡ, không khí trong lành và tiếng sóng vỗ dịu êm, mang lại cảm giác thư thái tuyệt đối.</p>
      <img src="https://i.ibb.co/fz3czTKg/N009586.jpg" alt="Vịnh Hạ Long" class="blog-content-img" />

      <h2>Trải nghiệm du thuyền sang trọng</h2>
      <p>Du thuyền trên vịnh là lựa chọn lý tưởng để tận hưởng không gian riêng tư, dịch vụ đẳng cấp và các hoạt động giải trí như bơi lội, câu cá, thưởng thức tiệc BBQ trên boong tàu. Đặc biệt, ngắm hoàng hôn trên vịnh là trải nghiệm không thể bỏ lỡ. Khi mặt trời dần khuất sau những dãy núi đá vôi, cả vịnh như khoác lên mình tấm áo vàng óng ánh, tạo nên khung cảnh lãng mạn khó quên. Đừng quên mang theo máy ảnh để lưu giữ những khoảnh khắc tuyệt đẹp này!</p>
      <img src=" https://i.ibb.co/3mHy2ysx/image.png" alt="Trải nghiệm Hạ Long" class="blog-content-img" />

      <h2>Ẩm thực Hạ Long – Đậm đà hương vị biển</h2>
      <p>Hạ Long nổi tiếng với các món hải sản tươi sống như chả mực, sam biển, ngán, tu hài, bề bề... Đừng quên ghé chợ đêm Hạ Long hoặc các nhà hàng ven biển để thưởng thức đặc sản địa phương. Một bữa tối bên bờ biển, thưởng thức hải sản nướng thơm lừng, nhâm nhi ly bia mát lạnh cùng bạn bè chắc chắn sẽ là trải nghiệm khó quên trong chuyến đi của bạn.</p>

      <h2>Những địa điểm check-in nổi tiếng</h2>
      <div class="blog-list-item"><b>Đảo Titop</b>: Bãi tắm đẹp, leo núi ngắm toàn cảnh vịnh. Đứng trên đỉnh Titop, bạn sẽ có cảm giác như đang ôm trọn cả vịnh Hạ Long vào lòng.</div>
      <div class="blog-list-item"><b>Hang Sửng Sốt</b>: Một trong những hang động lớn và đẹp nhất vịnh, với những khối thạch nhũ kỳ ảo, lung linh dưới ánh đèn.</div>
      <div class="blog-list-item"><b>Làng chài Cửa Vạn</b>: Khám phá cuộc sống ngư dân trên vịnh, trải nghiệm chèo thuyền nan, nghe kể chuyện về biển cả.</div>
      <div class="blog-list-item"><b>Cầu Bãi Cháy</b>: Biểu tượng hiện đại của thành phố Hạ Long, nơi lý tưởng để ngắm cảnh đêm lung linh ánh đèn.</div>
      <img src="https://i.ibb.co/fdwB0F5v/image.png" alt="Đảo Ngọc Vừng" class="blog-content-img" />

      <h2>Hoạt động giải trí hấp dẫn</h2>
      <p>Bên cạnh tham quan, bạn có thể tham gia chèo kayak, lặn ngắm san hô, câu mực đêm, hoặc trải nghiệm công viên Sun World Hạ Long với nhiều trò chơi cảm giác mạnh. Đặc biệt, các hoạt động team building trên bãi biển cũng rất được các nhóm bạn trẻ và công ty yêu thích.</p>

      <h2>Lưu ý khi du lịch Hạ Long</h2>
      <div class="blog-list-item">Nên đặt phòng khách sạn, vé tàu, du thuyền trước khi đi, nhất là mùa cao điểm.</div>
      <div class="blog-list-item">Chuẩn bị kem chống nắng, mũ, kính râm và đồ bơi.</div>
      <div class="blog-list-item">Giữ gìn vệ sinh môi trường, không xả rác xuống vịnh.</div>
      <div class="blog-list-item">Tham khảo dự báo thời tiết để lên lịch trình phù hợp.</div>
      <div class="blog-list-item">Luôn mang theo một ít tiền mặt vì một số dịch vụ nhỏ chưa hỗ trợ thanh toán điện tử.</div>

      <h2>Gợi ý lịch trình 2 ngày 1 đêm tại Hạ Long</h2>
      <div class="blog-list-item"><b>Ngày 1:</b> Sáng di chuyển đến Hạ Long, nhận phòng khách sạn. Trưa thưởng thức hải sản. Chiều tham quan Vịnh Hạ Long bằng du thuyền, ghé thăm hang Sửng Sốt, đảo Titop, chèo kayak. Tối dạo chợ đêm, thưởng thức đặc sản địa phương, mua quà lưu niệm.</div>
      <div class="blog-list-item"><b>Ngày 2:</b> Sáng dậy sớm ngắm bình minh, tham quan làng chài Cửa Vạn, trải nghiệm câu mực hoặc tắm biển Bãi Cháy. Trưa trả phòng, mua quà lưu niệm và trở về.</div>
      <p>Lịch trình này phù hợp cho nhóm bạn trẻ, gia đình hoặc cặp đôi muốn khám phá trọn vẹn Hạ Long trong thời gian ngắn mà vẫn tận hưởng được nhiều trải nghiệm đặc sắc. Đừng quên lưu lại những khoảnh khắc tuyệt vời để chia sẻ cùng bạn bè nhé!</p>
    `,
    gallery: [
      "https://i.ibb.co/8ntW9nfN/caubaichay.jpg",
      "https://i.ibb.co/CKHZCxk2/whee-Halong.jpg",
    ],
  },
  {
    id: "2",
    title: "Những sáng tạo trong khai thác du lịch trên vịnh Hạ Long",
    date: "23-11-2024",
    views: 520,
    image: "https://i.ibb.co/7xKr753G/cc.jpg",
    description:
      "Với một di sản thiên nhiên độc đáo như Vịnh Hạ Long, việc khai thác, phát triển du lịch cũng phải có sự sáng tạo để thu hút du khách từ khắp nơi trên thế giới. Bài viết điểm qua những mô hình, ý tưởng mới mẻ giúp du lịch Hạ Long ngày càng phát triển bền vững.",
    content: `
      <h2>Đổi mới sản phẩm du lịch trên vịnh</h2>
      <div class="blog-list-item"><b>Du thuyền nghỉ dưỡng cao cấp:</b> Không gian sang trọng, dịch vụ chuẩn quốc tế, các phòng nghỉ hướng vịnh, nhà hàng nổi, spa, bể bơi vô cực, các hoạt động giải trí trên boong tàu. Du khách có thể lựa chọn các gói du thuyền 1 ngày, 2 ngày 1 đêm hoặc dài hơn, tận hưởng trọn vẹn vẻ đẹp vịnh Hạ Long cả ngày lẫn đêm.</div>
      <div class="blog-list-item"><b>Tour chèo kayak khám phá hang động:</b> Tự mình chèo thuyền len lỏi qua các hang động kỳ bí, tận mắt ngắm nhìn hệ sinh thái đa dạng, những vách đá vôi sừng sững, lắng nghe tiếng sóng vỗ và cảm nhận sự yên bình tuyệt đối giữa thiên nhiên.</div>
      <div class="blog-list-item"><b>Trải nghiệm làng chài nổi:</b> Tham quan, tìm hiểu cuộc sống ngư dân, tham gia các hoạt động đánh bắt cá, chế biến hải sản, thưởng thức các món ăn tươi ngon ngay trên bè nổi. Đây là cơ hội để du khách hòa mình vào văn hóa bản địa, lắng nghe những câu chuyện đời thường của người dân vùng biển.</div>
      <div class="blog-list-item"><b>Thể thao dưới nước:</b> Ngoài bơi lội, lặn ngắm san hô, còn có các hoạt động như mô tô nước, chèo SUP, câu mực đêm, dù lượn... mang lại cảm giác mạnh và những trải nghiệm khó quên trên vịnh.</div>
      <img src="https://i.ibb.co/q3yKff9K/image.png" alt="Du lịch sáng tạo Hạ Long" class="blog-content-img" />

      <h2>Ứng dụng công nghệ trong quản lý và quảng bá</h2>
      <div class="blog-list-item"><b>Đặt vé online, check-in điện tử:</b> Tiết kiệm thời gian, hạn chế tiếp xúc, dễ dàng lựa chọn lịch trình phù hợp và nhận các ưu đãi hấp dẫn.</div>
      <div class="blog-list-item"><b>Ứng dụng bản đồ số, hướng dẫn du lịch thông minh:</b> Giúp du khách tự do khám phá, tìm kiếm địa điểm, nhà hàng, khách sạn, các điểm check-in nổi bật trên vịnh.</div>
      <div class="blog-list-item"><b>Quản lý lượng khách, bảo vệ môi trường:</b> Công nghệ giúp kiểm soát số lượng tàu, khách tham quan từng khu vực, hạn chế quá tải, đồng thời giám sát chất lượng nước, cảnh báo nguy cơ ô nhiễm.</div>
      <div class="blog-list-item"><b>Quảng bá hình ảnh Hạ Long ra thế giới:</b> Các chiến dịch truyền thông số, mạng xã hội, video 360 độ, livestream... giúp Hạ Long tiếp cận hàng triệu du khách quốc tế mỗi năm.</div>

      <h2>Du lịch xanh và phát triển bền vững</h2>
      <div class="blog-list-item"><b>Hạn chế rác thải nhựa:</b> Các doanh nghiệp du lịch cam kết không sử dụng đồ nhựa dùng một lần, thay thế bằng vật liệu thân thiện môi trường, khuyến khích du khách mang theo bình nước cá nhân.</div>
      <div class="blog-list-item"><b>Chiến dịch làm sạch vịnh:</b> Tổ chức định kỳ các hoạt động thu gom rác, làm sạch bãi biển, lồng ghép các chương trình giáo dục ý thức bảo vệ môi trường cho du khách và cộng đồng.</div>
      <div class="blog-list-item"><b>Phát triển tàu điện, tàu năng lượng mặt trời:</b> Giảm thiểu khí thải, bảo vệ hệ sinh thái biển, tạo hình ảnh hiện đại, văn minh cho du lịch Hạ Long.</div>
      <div class="blog-list-item"><b>Du lịch sinh thái, trải nghiệm xanh:</b> Khuyến khích các tour trekking, khám phá thiên nhiên, tham quan rừng ngập mặn, tìm hiểu hệ động thực vật đặc hữu của vịnh.</div>
      <img src="https://i.ibb.co/fdwB0F5v/image.png" alt="Đảo Ngọc Vừng" class="blog-content-img" />

      <h2>Hợp tác cộng đồng và phát triển du lịch trải nghiệm</h2>
      <div class="blog-list-item"><b>Homestay, farmstay ven biển:</b> Ở cùng gia đình địa phương, trải nghiệm cuộc sống thường nhật, thưởng thức bữa cơm nhà, học cách làm các món ăn truyền thống.</div>
      <div class="blog-list-item"><b>Hướng dẫn viên bản địa:</b> Được nghe kể chuyện về lịch sử, văn hóa, phong tục tập quán của vùng biển Hạ Long qua góc nhìn của chính người dân nơi đây.</div>
      <div class="blog-list-item"><b>Tham gia lễ hội, sự kiện địa phương:</b> Hòa mình vào không khí lễ hội, các hoạt động văn nghệ, trò chơi dân gian, lễ hội đua thuyền, lễ hội cầu ngư... để cảm nhận trọn vẹn bản sắc vùng biển.</div>
      <div class="blog-list-item"><b>Trải nghiệm nghề truyền thống:</b> Tham gia làm ngư cụ, đan lưới, chế biến hải sản khô, học cách bảo quản cá, mực theo phương pháp cổ truyền.</div>

      <h2>Trải nghiệm ngay!</h2>
      <p>Đừng bỏ lỡ cơ hội trở thành một phần của làn sóng đổi mới trên vịnh Hạ Long. Mỗi chuyến đi là một hành trình khám phá, mỗi trải nghiệm là một câu chuyện đáng nhớ. Đặt tour ngay hôm nay để tận hưởng những điều tuyệt vời nhất mà Hạ Long đang chờ bạn khám phá! Hãy để Hạ Long truyền cảm hứng cho bạn bằng những điều mới mẻ, độc đáo và đầy bất ngờ – nơi mọi khoảnh khắc đều xứng đáng để lưu giữ!</p>
    `,
    gallery: [
      "https://i.ibb.co/dshhysxN/image.png",
      "https://i.ibb.co/Rkc15vr2/image.png",
    ],
  },
  {
    id: "3",
    title: "TOUR Du lịch 3 ngày 2 đêm Hạ Long - Đảo Ngọc Vừng",
    date: "23-7-2024",
    views: 401,
    image: "https://i.ibb.co/fdwB0F5v/image.png",
    description:
      "Tận hưởng chuyến nghỉ dưỡng 3 ngày tại đảo Ngọc, nơi thiên nhiên hòa quyện cùng sự tiện nghi, gói tour sẽ bao gồm xe đưa đón khứ hồi, khách sạn, bữa ăn và nhiều hoạt động thú vị, đạp xe dọc những con đường ven biển tuyệt đẹp, chèo kayak, khám phá làng chài và thưởng thức hải sản tươi ngon.",
    content: `
      <h2>Giới thiệu về tour</h2>
      <p>Tour du lịch 3 ngày 2 đêm Hạ Long - Đảo Ngọc Vừng là lựa chọn lý tưởng cho những ai muốn khám phá vẻ đẹp hoang sơ của đảo Ngọc, tận hưởng không khí trong lành và trải nghiệm các dịch vụ tiện nghi. Đảo Ngọc Vừng nổi tiếng với bãi biển dài, cát trắng mịn, nước biển trong xanh và không gian yên bình, rất thích hợp để nghỉ dưỡng, thư giãn sau những ngày làm việc căng thẳng. Đến với tour này, bạn sẽ được hòa mình vào thiên nhiên, cảm nhận từng làn gió biển mát lành, ngắm nhìn bình minh rực rỡ trên biển và thả hồn theo tiếng sóng vỗ dịu êm.</p>
      <img src="https://i.ibb.co/7Jg3Cbkf/image.png" alt="Đảo Ngọc Vừng" class="blog-content-img" />

      <h2>Lịch trình chi tiết</h2>
      <div class="blog-list-item"><b>Ngày 1:</b> Buổi sáng, xe đón khách tại điểm hẹn và khởi hành đến Hạ Long. Trên đường đi, bạn sẽ được nghe giới thiệu về các địa danh nổi tiếng, dừng chân nghỉ ngơi và thưởng thức đặc sản địa phương. Đến Hạ Long, đoàn lên tàu ra đảo Ngọc Vừng, tận hưởng không khí biển cả và ngắm nhìn những hòn đảo đá vôi kỳ vĩ. Sau khi nhận phòng khách sạn và ăn trưa, buổi chiều là thời gian tự do để bạn tắm biển, tham gia các hoạt động vui chơi trên bãi biển như bóng chuyền, xây lâu đài cát, hoặc đơn giản là nằm dài trên ghế, nghe tiếng sóng vỗ và tận hưởng sự thư thái. Buổi tối, bạn sẽ thưởng thức bữa tiệc hải sản tươi ngon, tham gia các hoạt động giao lưu, đốt lửa trại trên bãi biển, cùng nhau ca hát, nhảy múa và chia sẻ những câu chuyện thú vị bên ánh lửa bập bùng.</div>
      <div class="blog-list-item"><b>Ngày 2:</b> Sau bữa sáng, đoàn sẽ đạp xe dọc ven biển, khám phá những con đường rợp bóng cây xanh, ngắm nhìn cảnh biển tuyệt đẹp và cảm nhận nhịp sống yên bình của đảo. Tiếp đó, bạn sẽ được tham quan làng chài truyền thống, trò chuyện với ngư dân, tìm hiểu về nghề đánh bắt cá, học cách chế biến các món hải sản đặc sản của vùng biển. Trải nghiệm chèo kayak trên làn nước trong xanh, len lỏi qua các khe đá, khám phá những góc nhỏ hoang sơ của đảo. Buổi chiều, bạn có thể tự do nghỉ ngơi tại khách sạn, thư giãn bên bãi biển hoặc tham gia các hoạt động team building sôi động, gắn kết các thành viên trong đoàn. Buổi tối là thời gian giao lưu văn nghệ, thưởng thức đặc sản địa phương và tận hưởng không khí biển về đêm.</div>
      <div class="blog-list-item"><b>Ngày 3:</b> Dậy sớm ngắm bình minh trên biển, hít thở không khí trong lành và lưu lại những khoảnh khắc tuyệt đẹp bằng máy ảnh. Sau bữa sáng, bạn có thể tự do mua sắm đặc sản địa phương, lựa chọn những món quà ý nghĩa cho người thân, bạn bè. Đến giờ trả phòng, đoàn lên tàu về lại Hạ Long, xe đưa khách về điểm xuất phát, kết thúc hành trình với nhiều kỷ niệm khó quên.</div>

      <h2>Dịch vụ bao gồm</h2>
      <p>Tour đã bao gồm xe đưa đón khứ hồi hiện đại, đảm bảo an toàn và tiện lợi cho du khách trong suốt hành trình. Khách sạn tiêu chuẩn trên đảo với phòng nghỉ sạch sẽ, đầy đủ tiện nghi, mang đến cho bạn cảm giác thoải mái như ở nhà. Vé tàu ra đảo, các bữa ăn theo chương trình với thực đơn phong phú, đậm chất biển, giúp bạn thưởng thức trọn vẹn hương vị ẩm thực địa phương. Hướng dẫn viên nhiệt tình, chuyên nghiệp, luôn đồng hành và hỗ trợ bạn trong mọi hoạt động. Ngoài ra, bạn còn được tham gia các hoạt động vui chơi, giải trí, team building, giao lưu văn nghệ, tạo nên những trải nghiệm đáng nhớ cùng bạn bè và người thân.</p>
      <img src="https://i.ibb.co/fdwB0F5v/image.png" alt="Đảo Ngọc Vừng" class="blog-content-img" />

      <h2>Lưu ý khi tham gia tour</h2>
      <p>Để chuyến đi thêm trọn vẹn, bạn nên chuẩn bị đầy đủ đồ dùng cá nhân, kem chống nắng, mũ, kính râm, dép đi biển và các vật dụng cần thiết khác. Hãy tuân thủ hướng dẫn của hướng dẫn viên để đảm bảo an toàn cho bản thân và mọi người trong đoàn. Đặc biệt, hãy bảo vệ môi trường, không xả rác bừa bãi, giữ gìn cảnh quan thiên nhiên để đảo Ngọc Vừng luôn xanh, sạch, đẹp. Đừng quên mang theo máy ảnh hoặc điện thoại để lưu lại những khoảnh khắc tuyệt vời trên đảo, từ bình minh rực rỡ đến hoàng hôn lãng mạn bên bờ biển. Tour phù hợp cho gia đình, nhóm bạn hoặc công ty muốn trải nghiệm kỳ nghỉ trọn vẹn, an toàn và nhiều kỷ niệm đáng nhớ tại Hạ Long - Đảo Ngọc Vừng. Hãy để chuyến đi này trở thành một phần ký ức đẹp trong hành trình tuổi trẻ của bạn!</p>
    `,
    gallery: [
      "https://i.ibb.co/Q7sM0VYN/image.png",
      "https://i.ibb.co/3mh3GqSz/image.png",
    ],
  },
  {
    id: "4",
    title: "Hạ Long hướng đến là trung tâm du lịch tầm quốc tế",
    date: "24-09-2024",
    views: 530,
    image: "https://i.ibb.co/Z6Tydxbh/image.png",
    description:
      "Thành phố Hạ Long (Quảng Ninh) từ lâu được ví như thiên đường du lịch, giải trí với nhiều hoạt động sôi động, phong phú, thu hút đông đảo khách du lịch trong nước và quốc tế đến trải nghiệm.",
    content: `
  <h2>Hạ Long – Thiên đường du lịch giải trí không ngủ</h2>
  <p>Không chỉ là kỳ quan thiên nhiên nổi tiếng toàn cầu, <strong>Hạ Long</strong> còn là điểm đến giải trí đầy màu sắc – nơi bạn có thể tìm thấy mọi cung bậc cảm xúc: từ bình yên bên vịnh biển trong xanh đến bùng nổ giữa những đêm nhạc hội rực rỡ ánh sáng.</p>
  <p>Với sự pha trộn giữa vẻ đẹp kỳ vĩ của thiên nhiên và hơi thở hiện đại của thành phố năng động, Hạ Long chào đón du khách bằng những trải nghiệm đỉnh cao – từ nghỉ dưỡng sang trọng đến những bữa tiệc ánh sáng và lễ hội sôi động kéo dài suốt cả năm.</p>
  <img src="https://i.ibb.co/Z6Tydxbh/image.png" alt="Toàn cảnh Hạ Long" class="blog-content-img" />

  <h2>Hạ tầng bứt phá – Kết nối không giới hạn</h2>
  <p>Hạ Long của hôm nay là thành phố du lịch hiện đại bậc nhất miền Bắc, với hệ thống giao thông liên vùng được đầu tư mạnh mẽ. Cao tốc xuyên tỉnh, <strong>sân bay quốc tế Vân Đồn</strong> và <strong>cảng tàu khách quốc tế</strong> giúp hành trình đến Hạ Long chỉ còn tính bằng giờ.</p>
  <p>Các tổ hợp khách sạn – resort sang trọng, trung tâm thương mại, công viên chủ đề và chuỗi ẩm thực cao cấp trải dài ven biển, sẵn sàng đáp ứng mọi nhu cầu du lịch, nghỉ dưỡng và giải trí của du khách trong và ngoài nước.</p>
  <img src="https://i.ibb.co/CKHZCxk2/whee-Halong.jpg" alt="Hạ tầng giao thông Hạ Long" class="blog-content-img" />

  <h2>Trải nghiệm không giới hạn – Vui chơi hết mình</h2>
  <p>Dù bạn là người ưa khám phá thiên nhiên, đam mê mạo hiểm hay yêu thích sự náo nhiệt, Hạ Long đều có thứ để chinh phục trái tim bạn. Từ <strong>du thuyền hạng sang trên vịnh</strong>, khám phá <strong>hang Sửng Sốt</strong>, <strong>hang Thiên Cung</strong> đến thỏa sức vui chơi tại <strong>Sun World Halong Complex</strong> – công viên giải trí hàng đầu miền Bắc với cáp treo Nữ Hoàng, vòng quay Mặt Trời, công viên nước và hơn thế nữa.</p>
  <p>Và khi màn đêm buông xuống, thành phố như bừng tỉnh trong một diện mạo khác – lung linh ánh đèn, náo nhiệt với các <strong>lễ hội ánh sáng, pháo hoa nghệ thuật, âm nhạc đường phố</strong> và những quán bar bên vịnh sôi động. Một Hạ Long "không ngủ" đang chờ bạn khám phá!</p>
  <img src="https://i.ibb.co/DPpJxrxF/image.png" alt="Du lịch giải trí Hạ Long" class="blog-content-img" />

  <h2>Vươn mình thành trung tâm du lịch quốc tế</h2>
  <p>Với tầm nhìn xa và những chiến lược phát triển bài bản, Hạ Long không ngừng chuyển mình để trở thành <strong>trung tâm du lịch đẳng cấp quốc tế</strong>. Cảnh quan thiên nhiên – dịch vụ hiện đại – con người thân thiện là ba yếu tố tạo nên thương hiệu “Hạ Long – điểm đến không thể bỏ lỡ của châu Á”.</p>
  <p><em>Đừng chỉ nghe kể về Hạ Long – hãy đến và cảm nhận nhịp sống sôi động, vẻ đẹp trác tuyệt và tinh thần hiếu khách nơi đây. Hạ Long – nơi mọi hành trình đều bắt đầu bằng cảm hứng và kết thúc bằng những kỷ niệm khó quên.</em></p>
`,
    gallery: [
      "https://i.ibb.co/62wpygV/image.png",
      "https://i.ibb.co/JRJS8qgJ/image.png",
    ],
  },
  {
    id: "5",
    title: "Du lịch xanh - chìa khóa để vịnh Hạ Long phát triển bền vững",
    date: "14-12-2024",
    views: 628,
    image: "https://i.ibb.co/NgjtZzFn/image.png",
    description:
      "Là ngành kinh tế mũi nhọn của địa phương, du lịch Hạ Long đang phải đối mặt với nhiều thách thức trong công tác bảo tồn văn hóa, di sản và suy thoái môi trường. Phát triển du lịch bền vững theo hướng tăng trưởng xanh là giải pháp then chốt.",
    content: `
  <h2>Thách thức trong phát triển du lịch Hạ Long</h2>
  <p>Du lịch Hạ Long phát triển mạnh mẽ nhưng cũng kéo theo nhiều áp lực lên môi trường tự nhiên, hệ sinh thái biển và các giá trị di sản. Việc bảo tồn và phát triển bền vững trở thành yêu cầu cấp thiết. Nếu không có giải pháp kịp thời, những giá trị quý báu của vịnh có thể bị mai một theo thời gian.</p>
  <p>Hàng ngàn lượt tàu du lịch mỗi ngày, những dòng khách tấp nập và lượng rác thải gia tăng không kiểm soát đang âm thầm bào mòn vẻ đẹp nguyên sơ của vịnh. Nhiều rạn san hô đã bị tổn thương, hệ sinh vật bị ảnh hưởng nghiêm trọng. Đây không chỉ là bài toán môi trường, mà còn là hồi chuông cảnh tỉnh về trách nhiệm của toàn ngành và cộng đồng địa phương.</p>
  <img src="https://i.ibb.co/x8jqh3tJ/image.png" alt="Vịnh Hạ Long xanh" class="blog-content-img" />

  <h2>Du lịch xanh – Xu hướng tất yếu</h2>
  <p>Du lịch xanh hướng tới giảm thiểu tác động tiêu cực đến môi trường, sử dụng tài nguyên hợp lý, bảo vệ đa dạng sinh học và phát triển cộng đồng địa phương. Các doanh nghiệp du lịch ngày càng chú trọng đến việc sử dụng vật liệu thân thiện môi trường, giảm thiểu rác thải nhựa, tổ chức các hoạt động giáo dục ý thức bảo vệ môi trường cho du khách.</p>
  <p>Không chỉ là xu hướng, du lịch xanh đang trở thành tiêu chuẩn mới cho các điểm đến du lịch toàn cầu. Du khách hiện đại không còn chỉ tìm kiếm những trải nghiệm "check-in" bề nổi mà ngày càng quan tâm đến sự đóng góp của chuyến đi vào phát triển bền vững. Điều này mở ra một hướng đi mới cho Hạ Long: vừa giữ gìn di sản, vừa phát triển kinh tế du lịch một cách hài hòa.</p>
  <img src="https://i.ibb.co/27Gg651s/image.png" alt="Du lịch xanh Hạ Long" class="blog-content-img" />

  <h2>Những giải pháp phát triển bền vững</h2>
  <div class="blog-list-item">Khuyến khích sử dụng phương tiện thân thiện với môi trường như xe điện, tàu năng lượng mặt trời.</div>
  <div class="blog-list-item">Hạn chế rác thải nhựa, tổ chức các chiến dịch làm sạch vịnh, thu gom rác thải định kỳ.</div>
  <div class="blog-list-item">Phát triển các sản phẩm du lịch sinh thái, trải nghiệm văn hóa bản địa, giúp du khách hiểu và yêu hơn thiên nhiên Hạ Long.</div>
  <div class="blog-list-item">Tăng cường tuyên truyền, nâng cao ý thức bảo vệ môi trường cho du khách và người dân qua các chương trình truyền thông, hội thảo, hoạt động cộng đồng.</div>
  <div class="blog-list-item">Hợp tác chặt chẽ với các chuyên gia môi trường, tổ chức quốc tế để xây dựng chiến lược dài hạn, dựa trên nghiên cứu và bằng chứng khoa học.</div>
  <div class="blog-list-item">Áp dụng công nghệ số trong giám sát du lịch, như hệ thống cảm biến môi trường, ứng dụng du lịch thông minh để quản lý lưu lượng khách hiệu quả.</div>
  <img src="https://i.ibb.co/4nQvgTjt/image.png" alt="Bảo vệ môi trường Hạ Long" class="blog-content-img" />

  <h2>Khám phá Hạ Long xanh ngay hôm nay!</h2>
  <p>Hãy là người tiên phong trải nghiệm du lịch xanh tại Hạ Long – nơi mỗi bước chân của bạn góp phần gìn giữ vẻ đẹp vĩnh cửu của vịnh di sản. Đặt tour, lên lịch trình và tận hưởng kỳ nghỉ ý nghĩa, tràn đầy cảm hứng cùng thiên nhiên tuyệt mỹ và những giá trị bền vững!</p>
  <p>Dù là một buổi chèo thuyền kayak trên làn nước trong xanh, hay một buổi sáng ngồi bên người dân địa phương học làm bánh truyền thống, mỗi khoảnh khắc đều trở thành một phần của hành trình sống xanh – sống ý nghĩa. Hạ Long đang chờ bạn, không chỉ để khám phá, mà còn để bạn cùng chung tay bảo vệ.</p>
  <p>Hãy lựa chọn du lịch có trách nhiệm – vì một Hạ Long luôn xanh, luôn bền vững!</p>
`,
    gallery: [
      "https://i.ibb.co/SDrjqggC/image.png",
      "https://i.ibb.co/9382RvZB/image.png",
    ],
  },
  {
    id: "6",
    title: "TOUR Hạ long - Đảo Ngọc Vừng 2 ngày 1 đêm",
    date: "21-07-2024",
    views: 611,
    image: "https://i.ibb.co/fdwB0F5v/image.png",
    description:
      "Tận hưởng chuyến nghỉ dưỡng ngắn ngày tại đảo Ngọc Vừng, nơi thiên nhiên hòa quyện cùng sự tiện nghi, gói tour bao gồm xe đưa đón khứ hồi, khách sạn, bữa ăn và nhiều hoạt động thú vị như đạp xe ven biển, chèo kayak, khám phá làng chài và thưởng thức hải sản tươi ngon.",
    content: `
      <h2>Giới thiệu tour Hạ Long - Đảo Ngọc Vừng 2 ngày 1 đêm</h2>
      <p>Tour phù hợp cho những ai muốn trải nghiệm vẻ đẹp hoang sơ của đảo Ngọc Vừng trong thời gian ngắn. Đảo Ngọc Vừng nổi bật với bãi biển dài, cát trắng mịn, nước biển trong xanh và không khí trong lành, rất thích hợp để nghỉ dưỡng, thư giãn. Hành trình này sẽ mang đến cho bạn những phút giây bình yên, tạm rời xa phố thị ồn ào.</p>
      <img src="https://i.ibb.co/fdwB0F5v/image.png" alt="Đảo Ngọc Vừng" class="blog-content-img" />

      <h2>Lịch trình tour</h2>
      <div class="blog-step"><b>Ngày 1:</b> Xe đón khách tại điểm hẹn, di chuyển đến Hạ Long. Lên tàu ra đảo Ngọc Vừng, nhận phòng khách sạn, ăn trưa. Buổi chiều tự do tắm biển, tham gia các hoạt động vui chơi trên bãi biển như bóng chuyền, xây lâu đài cát, hoặc đơn giản là nằm dài trên ghế, nghe tiếng sóng vỗ. Tối thưởng thức hải sản tươi ngon, tham gia các hoạt động giao lưu, đốt lửa trại trên bãi biển.</div>
      <div class="blog-step"><b>Ngày 2:</b> Đạp xe dọc ven biển, tham quan làng chài, trải nghiệm chèo kayak, khám phá cuộc sống ngư dân. Trưa trả phòng, lên tàu về lại Hạ Long, xe đưa khách về điểm xuất phát.</div>

      <h2>Dịch vụ bao gồm</h2>
      <div class="blog-service">Xe đưa đón khứ hồi, đảm bảo an toàn và tiện lợi cho du khách.</div>
      <div class="blog-service">Khách sạn tiêu chuẩn trên đảo với phòng nghỉ sạch sẽ, đầy đủ tiện nghi.</div>
      <div class="blog-service">Vé tàu, các bữa ăn theo chương trình với thực đơn phong phú, đậm chất biển.</div>
      <div class="blog-service">Hướng dẫn viên nhiệt tình, chuyên nghiệp, hỗ trợ suốt hành trình.</div>
      <div class="blog-service">Tham gia các hoạt động vui chơi, giải trí, team building, giao lưu văn nghệ.</div>
      <img src="https://i.ibb.co/fdwB0F5v/image.png" alt="Đảo Ngọc Vừng" class="blog-content-img" />

      <h2>Lưu ý khi tham gia tour</h2>
      <div class="blog-note">Chuẩn bị đồ dùng cá nhân, kem chống nắng, mũ, kính râm, dép đi biển.</div>
      <div class="blog-note">Tuân thủ hướng dẫn của hướng dẫn viên để đảm bảo an toàn.</div>
      <div class="blog-note">Bảo vệ môi trường, không xả rác bừa bãi, giữ gìn cảnh quan thiên nhiên.</div>
      <div class="blog-note">Đừng quên mang theo máy ảnh để lưu lại những khoảnh khắc tuyệt đẹp trên đảo.</div>
      <p>Tour phù hợp cho gia đình, nhóm bạn hoặc công ty muốn trải nghiệm kỳ nghỉ trọn vẹn, an toàn và nhiều kỷ niệm đáng nhớ tại Hạ Long - Đảo Ngọc Vừng. Hãy để chuyến đi này trở thành một phần ký ức đẹp trong hành trình tuổi trẻ của bạn!</p>
    `,
    gallery: [
      "https://i.ibb.co/Q7sM0VYN/image.png",
      "https://i.ibb.co/3mh3GqSz/image.png",
    ],
  },
  {
    id: "7",
    title:
      "A La Carte Hạ Long – Trải nghiệm nghỉ dưỡng đẳng cấp bên vịnh di sản",
    date: "30-07-2023",
    views: 528,
    image: "https://i.ibb.co/HDKBrNms/image.png",
    description:
      "Khám phá A La Carte Hạ Long – điểm đến nghỉ dưỡng sang trọng với hồ bơi vô cực, sky bar, ẩm thực đa dạng và nhiều hoạt động giải trí hấp dẫn giữa lòng vịnh di sản.",
    content: `
      <h2>A La Carte Hạ Long – Biểu tượng mới của nghỉ dưỡng hiện đại</h2>
      <p>Nằm ngay bên bờ vịnh Hạ Long, A La Carte là khách sạn 5 sao nổi bật với kiến trúc hiện đại, không gian mở hướng biển và dịch vụ chuẩn quốc tế. Từ ban công phòng nghỉ, bạn có thể ngắm trọn vẹn vẻ đẹp kỳ vĩ của vịnh, tận hưởng làn gió biển mát lành mỗi sớm mai. Cảm giác thức dậy giữa thiên nhiên hùng vĩ, nhâm nhi tách cà phê và ngắm bình minh trên vịnh chắc chắn sẽ khiến bạn nhớ mãi.</p>
      <img src="https://i.ibb.co/8gd3cjWp/image.png" alt="A La Carte Hạ Long" class="blog-content-img" />

      <h2>Hồ bơi vô cực & Sky Bar – Check-in cực chất</h2>
      <p>Điểm nhấn của A La Carte chính là hồ bơi vô cực trên tầng thượng, nơi bạn vừa bơi lội vừa phóng tầm mắt ra vịnh xanh ngọc bích. Đừng quên thưởng thức cocktail tại sky bar, tận hưởng không khí sôi động về đêm và lưu lại những bức hình “sống ảo” cực chất. Vào buổi tối, ánh đèn lung linh cùng âm nhạc sôi động sẽ biến nơi đây thành thiên đường giải trí giữa lòng di sản.</p>
      <img src="https://i.ibb.co/L4B4WNp/image.png" alt="Sky Bar A La Carte" class="blog-content-img" />

      <h2>Ẩm thực đa dạng – Hương vị Á Âu hội tụ</h2>
      <p>Nhà hàng tại A La Carte phục vụ buffet sáng phong phú, các món hải sản tươi sống, đặc sản Quảng Ninh và thực đơn quốc tế. Bạn có thể thưởng thức bữa tối lãng mạn bên ánh nến, ngắm hoàng hôn buông xuống vịnh, hoặc tham gia các bữa tiệc BBQ ngoài trời cùng bạn bè, gia đình.</p>

      <h2>Trải nghiệm giải trí & thư giãn</h2>
      <div class="blog-list-item">Tham gia lớp yoga sáng trên sân thượng, khởi đầu ngày mới đầy năng lượng và cảm hứng.</div>
      <div class="blog-list-item">Thư giãn tại spa với các liệu trình chăm sóc chuyên nghiệp, giúp bạn phục hồi sức khỏe và tinh thần.</div>
      <div class="blog-list-item">Khám phá khu vui chơi trẻ em, phòng gym hiện đại, đạp xe dạo quanh bờ biển, tận hưởng không khí trong lành.</div>
      <div class="blog-list-item">Đặt tour tham quan vịnh, chèo kayak, hoặc trải nghiệm du thuyền sang trọng ngay tại khách sạn, cảm nhận trọn vẹn vẻ đẹp Hạ Long từ nhiều góc nhìn khác nhau.</div>
      <img src="https://i.ibb.co/Psz5Y8gL/image.png" alt="Sky Bar A La Carte" class="blog-content-img" />

      <h2>Lưu ý khi nghỉ dưỡng tại A La Carte Hạ Long</h2>
      <div class="blog-list-item">Nên đặt phòng trước, đặc biệt vào dịp cuối tuần và mùa cao điểm để chọn được vị trí đẹp nhất.</div>
      <div class="blog-list-item">Chuẩn bị đồ bơi, kính râm, kem chống nắng để tận hưởng trọn vẹn các tiện ích ngoài trời.</div>
      <div class="blog-list-item">Đừng bỏ lỡ các chương trình ưu đãi, tiệc BBQ hoặc sự kiện đặc biệt của khách sạn để chuyến đi thêm phần thú vị.</div>
      <p>A La Carte Hạ Long là lựa chọn lý tưởng cho kỳ nghỉ gia đình, cặp đôi hay nhóm bạn muốn tận hưởng không gian sang trọng, dịch vụ đẳng cấp và những trải nghiệm khó quên giữa lòng di sản thiên nhiên thế giới. Hãy đến và cảm nhận sự khác biệt tại A La Carte Hạ Long!</p>
    `,
    gallery: [
      "https://i.ibb.co/FktHq7Wy/image.png",
      "https://i.ibb.co/WNnqwLm7/image.png",
    ],
  },
];
