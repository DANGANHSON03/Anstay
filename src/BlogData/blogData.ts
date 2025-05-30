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
      "Khám phá vẻ đẹp của Vịnh Hạ Long, trải nghiệm du thuyền sang trọng, thưởng thức ẩm thực biển tươi ngon, check-in những địa điểm nổi tiếng và tận hưởng kỳ nghỉ tuyệt vời cùng gia đình, bạn bè...",
    content: [
      {
        id: "t1",
        type: "title",
        text: "Vịnh Hạ Long – Viên ngọc của miền Bắc",
      },
      {
        id: "p1",
        type: "paragraph",
        html: "Không chỉ là kỳ quan thiên nhiên, Hạ Long còn là một bản tình ca của sóng, đá và trời. Nơi đây sở hữu hàng nghìn hòn đảo lớn nhỏ, tạo nên khung cảnh kỳ vĩ, thơ mộng và huyền bí. Du khách có thể lựa chọn tham quan vịnh bằng tàu, du thuyền hoặc chèo kayak để cảm nhận trọn vẹn vẻ đẹp của thiên nhiên. Mỗi sáng thức dậy trên vịnh, bạn sẽ được đón ánh bình minh rực rỡ, không khí trong lành và tiếng sóng vỗ dịu êm, mang lại cảm giác thư thái tuyệt đối.",
      },
      {
        id: "img1",
        type: "image",
        src: "https://i.ibb.co/fz3czTKg/N009586.jpg",
        alt: "Vịnh Hạ Long",
      },
      { id: "t2", type: "title", text: "Trải nghiệm du thuyền sang trọng" },
      {
        id: "p2",
        type: "paragraph",
        html: "Du thuyền trên vịnh là lựa chọn lý tưởng để tận hưởng không gian riêng tư, dịch vụ đẳng cấp và các hoạt động giải trí như bơi lội, câu cá, thưởng thức tiệc BBQ trên boong tàu. Đặc biệt, ngắm hoàng hôn trên vịnh là trải nghiệm không thể bỏ lỡ. Khi mặt trời dần khuất sau những dãy núi đá vôi, cả vịnh như khoác lên mình tấm áo vàng óng ánh, tạo nên khung cảnh lãng mạn khó quên. Đừng quên mang theo máy ảnh để lưu giữ những khoảnh khắc tuyệt đẹp này!",
      },
      {
        id: "img2",
        type: "image",
        src: "https://i.ibb.co/3mHy2ysx/image.png",
        alt: "Trải nghiệm Hạ Long",
      },
      {
        id: "t3",
        type: "title",
        text: "Ẩm thực Hạ Long – Đậm đà hương vị biển",
      },
      {
        id: "p3",
        type: "paragraph",
        html: "Hạ Long nổi tiếng với các món hải sản tươi sống như chả mực, sam biển, ngán, tu hài, bề bề... Đừng quên ghé chợ đêm Hạ Long hoặc các nhà hàng ven biển để thưởng thức đặc sản địa phương. Một bữa tối bên bờ biển, thưởng thức hải sản nướng thơm lừng, nhâm nhi ly bia mát lạnh cùng bạn bè chắc chắn sẽ là trải nghiệm khó quên trong chuyến đi của bạn.",
      },
      { id: "t4", type: "title", text: "Những địa điểm check-in nổi tiếng" },
      {
        id: "list1",
        type: "list",
        items: [
          "<b>Đảo Titop</b>: Bãi tắm đẹp, leo núi ngắm toàn cảnh vịnh. Đứng trên đỉnh Titop, bạn sẽ có cảm giác như đang ôm trọn cả vịnh Hạ Long vào lòng.",
          "<b>Hang Sửng Sốt</b>: Một trong những hang động lớn và đẹp nhất vịnh, với những khối thạch nhũ kỳ ảo, lung linh dưới ánh đèn.",
          "<b>Làng chài Cửa Vạn</b>: Khám phá cuộc sống ngư dân trên vịnh, trải nghiệm chèo thuyền nan, nghe kể chuyện về biển cả.",
          "<b>Cầu Bãi Cháy</b>: Biểu tượng hiện đại của thành phố Hạ Long, nơi lý tưởng để ngắm cảnh đêm lung linh ánh đèn.",
        ],
      },
      {
        id: "img3",
        type: "image",
        src: "https://i.ibb.co/fdwB0F5v/image.png",
        alt: "Đảo Ngọc Vừng",
      },
      { id: "t5", type: "title", text: "Hoạt động giải trí hấp dẫn" },
      {
        id: "p4",
        type: "paragraph",
        html: "Bên cạnh tham quan, bạn có thể tham gia chèo kayak, lặn ngắm san hô, câu mực đêm, hoặc trải nghiệm công viên Sun World Hạ Long với nhiều trò chơi cảm giác mạnh. Đặc biệt, các hoạt động team building trên bãi biển cũng rất được các nhóm bạn trẻ và công ty yêu thích.",
      },
      { id: "t6", type: "title", text: "Lưu ý khi du lịch Hạ Long" },
      {
        id: "list2",
        type: "list",
        items: [
          "Nên đặt phòng khách sạn, vé tàu, du thuyền trước khi đi, nhất là mùa cao điểm.",
          "Chuẩn bị kem chống nắng, mũ, kính râm và đồ bơi.",
          "Giữ gìn vệ sinh môi trường, không xả rác xuống vịnh.",
          "Tham khảo dự báo thời tiết để lên lịch trình phù hợp.",
          "Luôn mang theo một ít tiền mặt vì một số dịch vụ nhỏ chưa hỗ trợ thanh toán điện tử.",
        ],
      },
      {
        id: "t7",
        type: "title",
        text: "Gợi ý lịch trình 2 ngày 1 đêm tại Hạ Long",
      },
      {
        id: "list3",
        type: "list",
        items: [
          "<b>Ngày 1:</b> Sáng di chuyển đến Hạ Long, nhận phòng khách sạn. Trưa thưởng thức hải sản. Chiều tham quan Vịnh Hạ Long bằng du thuyền, ghé thăm hang Sửng Sốt, đảo Titop, chèo kayak. Tối dạo chợ đêm, thưởng thức đặc sản địa phương, mua quà lưu niệm.",
          "<b>Ngày 2:</b> Sáng dậy sớm ngắm bình minh, tham quan làng chài Cửa Vạn, trải nghiệm câu mực hoặc tắm biển Bãi Cháy. Trưa trả phòng, mua quà lưu niệm và trở về.",
        ],
      },
      {
        id: "p5",
        type: "paragraph",
        html: "Lịch trình này phù hợp cho nhóm bạn trẻ, gia đình hoặc cặp đôi muốn khám phá trọn vẹn Hạ Long trong thời gian ngắn mà vẫn tận hưởng được nhiều trải nghiệm đặc sắc. Đừng quên lưu lại những khoảnh khắc tuyệt vời để chia sẻ cùng bạn bè nhé!",
      },
    ],
    gallery: [
      "https://i.ibb.co/dshhysxN/image.png",
      "https://i.ibb.co/Rkc15vr2/image.png",
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
    content: [
      { id: "t1", type: "title", text: "Đổi mới sản phẩm du lịch trên vịnh" },
      {
        id: "li1",
        type: "list",
        items: [
          "<b>Du thuyền nghỉ dưỡng cao cấp:</b> Không gian sang trọng, dịch vụ chuẩn quốc tế, các phòng nghỉ hướng vịnh, nhà hàng nổi, spa, bể bơi vô cực, các hoạt động giải trí trên boong tàu. Du khách có thể lựa chọn các gói du thuyền 1 ngày, 2 ngày 1 đêm hoặc dài hơn, tận hưởng trọn vẹn vẻ đẹp vịnh Hạ Long cả ngày lẫn đêm.",
          "<b>Tour chèo kayak khám phá hang động:</b> Tự mình chèo thuyền len lỏi qua các hang động kỳ bí, tận mắt ngắm nhìn hệ sinh thái đa dạng, những vách đá vôi sừng sững, lắng nghe tiếng sóng vỗ và cảm nhận sự yên bình tuyệt đối giữa thiên nhiên.",
          "<b>Trải nghiệm làng chài nổi:</b> Tham quan, tìm hiểu cuộc sống ngư dân, tham gia các hoạt động đánh bắt cá, chế biến hải sản, thưởng thức các món ăn tươi ngon ngay trên bè nổi. Đây là cơ hội để du khách hòa mình vào văn hóa bản địa, lắng nghe những câu chuyện đời thường của người dân vùng biển.",
          "<b>Thể thao dưới nước:</b> Ngoài bơi lội, lặn ngắm san hô, còn có các hoạt động như mô tô nước, chèo SUP, câu mực đêm, dù lượn... mang lại cảm giác mạnh và những trải nghiệm khó quên trên vịnh.",
        ],
      },
      {
        id: "img1",
        type: "image",
        src: "https://i.ibb.co/q3yKff9K/image.png",
        alt: "Du lịch sáng tạo Hạ Long",
      },
      {
        id: "t2",
        type: "title",
        text: "Ứng dụng công nghệ trong quản lý và quảng bá",
      },
      {
        id: "li2",
        type: "list",
        items: [
          "<b>Đặt vé online, check-in điện tử:</b> Tiết kiệm thời gian, hạn chế tiếp xúc, dễ dàng lựa chọn lịch trình phù hợp và nhận các ưu đãi hấp dẫn.",
          "<b>Ứng dụng bản đồ số, hướng dẫn du lịch thông minh:</b> Giúp du khách tự do khám phá, tìm kiếm địa điểm, nhà hàng, khách sạn, các điểm check-in nổi bật trên vịnh.",
          "<b>Quản lý lượng khách, bảo vệ môi trường:</b> Công nghệ giúp kiểm soát số lượng tàu, khách tham quan từng khu vực, hạn chế quá tải, đồng thời giám sát chất lượng nước, cảnh báo nguy cơ ô nhiễm.",
          "<b>Quảng bá hình ảnh Hạ Long ra thế giới:</b> Các chiến dịch truyền thông số, mạng xã hội, video 360 độ, livestream... giúp Hạ Long tiếp cận hàng triệu du khách quốc tế mỗi năm.",
        ],
      },
      { id: "t3", type: "title", text: "Du lịch xanh và phát triển bền vững" },
      {
        id: "li3",
        type: "list",
        items: [
          "<b>Hạn chế rác thải nhựa:</b> Các doanh nghiệp du lịch cam kết không sử dụng đồ nhựa dùng một lần, thay thế bằng vật liệu thân thiện môi trường, khuyến khích du khách mang theo bình nước cá nhân.",
          "<b>Chiến dịch làm sạch vịnh:</b> Tổ chức định kỳ các hoạt động thu gom rác, làm sạch bãi biển, lồng ghép các chương trình giáo dục ý thức bảo vệ môi trường cho du khách và cộng đồng.",
          "<b>Phát triển tàu điện, tàu năng lượng mặt trời:</b> Giảm thiểu khí thải, bảo vệ hệ sinh thái biển, tạo hình ảnh hiện đại, văn minh cho du lịch Hạ Long.",
          "<b>Du lịch sinh thái, trải nghiệm xanh:</b> Khuyến khích các tour trekking, khám phá thiên nhiên, tham quan rừng ngập mặn, tìm hiểu hệ động thực vật đặc hữu của vịnh.",
        ],
      },
      {
        id: "img2",
        type: "image",
        src: "https://i.ibb.co/fdwB0F5v/image.png",
        alt: "Đảo Ngọc Vừng",
      },
      {
        id: "t4",
        type: "title",
        text: "Hợp tác cộng đồng và phát triển du lịch trải nghiệm",
      },
      {
        id: "li4",
        type: "list",
        items: [
          "<b>Homestay, farmstay ven biển:</b> Ở cùng gia đình địa phương, trải nghiệm cuộc sống thường nhật, thưởng thức bữa cơm nhà, học cách làm các món ăn truyền thống.",
          "<b>Hướng dẫn viên bản địa:</b> Được nghe kể chuyện về lịch sử, văn hóa, phong tục tập quán của vùng biển Hạ Long qua góc nhìn của chính người dân nơi đây.",
          "<b>Tham gia lễ hội, sự kiện địa phương:</b> Hòa mình vào không khí lễ hội, các hoạt động văn nghệ, trò chơi dân gian, lễ hội đua thuyền, lễ hội cầu ngư... để cảm nhận trọn vẹn bản sắc vùng biển.",
          "<b>Trải nghiệm nghề truyền thống:</b> Tham gia làm ngư cụ, đan lưới, chế biến hải sản khô, học cách bảo quản cá, mực theo phương pháp cổ truyền.",
        ],
      },
      { id: "t5", type: "title", text: "Trải nghiệm ngay!" },
      {
        id: "p1",
        type: "paragraph",
        html: "Đừng bỏ lỡ cơ hội trở thành một phần của làn sóng đổi mới trên vịnh Hạ Long. Mỗi chuyến đi là một hành trình khám phá, mỗi trải nghiệm là một câu chuyện đáng nhớ. Đặt tour ngay hôm nay để tận hưởng những điều tuyệt vời nhất mà Hạ Long đang chờ bạn khám phá! Hãy để Hạ Long truyền cảm hứng cho bạn bằng những điều mới mẻ, độc đáo và đầy bất ngờ – nơi mọi khoảnh khắc đều xứng đáng để lưu giữ!",
      },
    ],
    gallery: [
      "https://i.ibb.co/pv6hM2B5/image.png",
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
    content: [
      { id: "t1", type: "title", text: "Giới thiệu về tour" },
      {
        id: "p1",
        type: "paragraph",
        html: "Tour du lịch 3 ngày 2 đêm Hạ Long - Đảo Ngọc Vừng là lựa chọn lý tưởng dành cho những tâm hồn khát khao tìm về với thiên nhiên thuần khiết và sự bình yên nội tại. Đảo Ngọc Vừng, với dải cát trắng trải dài như dải lụa, làn nước trong vắt và khung cảnh hoang sơ, mang đến cho bạn cảm giác như đang đặt chân vào một miền thơ mộng bị lãng quên. Đây không chỉ là hành trình du lịch, mà là cuộc trốn thoát khỏi guồng quay thường nhật – nơi bạn thảnh thơi đón ánh bình minh trên biển, để từng làn gió nhẹ vuốt ve tâm hồn, và để tiếng sóng rì rào xoa dịu mọi mỏi mệt trong lòng.",
      },
      {
        id: "img1",
        type: "image",
        src: "https://i.ibb.co/7Jg3Cbkf/image.png",
        alt: "Đảo Ngọc Vừng",
      },

      { id: "t2", type: "title", text: "Lịch trình chi tiết" },
      {
        id: "li1",
        type: "list",
        items: [
          "<b>Ngày 1:</b> Xe đón bạn từ điểm hẹn, đưa bạn băng qua những cung đường rợp bóng cây xanh để đến với Hạ Long. Trên đường đi, hướng dẫn viên sẽ giới thiệu về những địa danh nổi bật, điểm xuyết bằng các câu chuyện thú vị giúp bạn hiểu hơn về vùng đất này. Đến nơi, bạn sẽ lên tàu tiến về đảo Ngọc Vừng – nơi biển trời gặp gỡ. Buổi chiều là khoảng thời gian lý tưởng để thả mình vào làn nước mát, chơi bóng chuyền, xây lâu đài cát, hay chỉ đơn giản nằm dài trên ghế nghe nhạc sóng biển. Tối đến, hãy sẵn sàng cho một đêm rực rỡ: tiệc hải sản tươi rói, đốt lửa trại, văn nghệ, nhảy múa – tất cả hòa quyện tạo nên bức tranh kỷ niệm lung linh dưới bầu trời sao.",
          "<b>Ngày 2:</b> Sau bữa sáng đầy năng lượng, bạn sẽ đạp xe dạo quanh đảo, hít hà bầu không khí trong lành trên những con đường ven biển. Ghé thăm làng chài truyền thống, lắng nghe những chia sẻ chân thật từ ngư dân, học cách chế biến các món đặc sản từ hải sản tươi sống. Chuyến chèo kayak buổi trưa là cơ hội để bạn khám phá những góc đảo hoang sơ chưa từng in dấu chân người. Chiều đến, những trò chơi team building trên bãi cát sẽ giúp các thành viên trong đoàn xích lại gần nhau hơn. Tối hôm đó, bạn sẽ hòa vào không gian nghệ thuật mang âm sắc địa phương, trong một đêm biển đầy sắc màu và tiếng cười.",
          "<b>Ngày 3:</b> Sáng sớm, bạn có thể dậy sớm ngắm bình minh – khoảnh khắc vàng của biển khơi. Sau bữa sáng nhẹ, dành thời gian dạo chơi, mua sắm quà tặng, chụp vài tấm ảnh lưu niệm. Khi chia tay đảo, bạn không chỉ mang về hành lý mà còn mang theo những thước phim ký ức dịu dàng. Xe đưa đoàn trở lại điểm xuất phát, kết thúc hành trình 3 ngày đầy cảm xúc và trải nghiệm sâu sắc.",
        ],
      },

      { id: "t3", type: "title", text: "Dịch vụ bao gồm" },
      {
        id: "p2",
        type: "paragraph",
        html: "Tour đã bao gồm đầy đủ các dịch vụ thiết yếu để bạn tận hưởng trọn vẹn hành trình mà không phải bận tâm đến bất cứ điều gì. Xe đưa đón đời mới, máy lạnh mát lạnh, đảm bảo an toàn tuyệt đối. Khách sạn tiêu chuẩn trên đảo với phòng ốc sạch sẽ, trang bị đầy đủ tiện nghi như máy lạnh, nước nóng, wifi. Các bữa ăn đậm đà hương vị biển, từ hải sản tươi sống đến đặc sản địa phương đều được chuẩn bị chu đáo. Vé tàu, phí vào cổng các điểm tham quan, hướng dẫn viên nhiệt tình, hỗ trợ 24/7 – tất cả đều đã bao gồm. Bạn chỉ cần xách vali và tận hưởng từng khoảnh khắc.",
      },
      {
        id: "img2",
        type: "image",
        src: "https://i.ibb.co/fdwB0F5v/image.png",
        alt: "Đảo Ngọc Vừng",
      },

      { id: "t4", type: "title", text: "Lưu ý khi tham gia tour" },
      {
        id: "p3",
        type: "paragraph",
        html: "Hãy chuẩn bị thật kỹ để tận dụng trọn vẹn hành trình. Đừng quên mang theo kem chống nắng, mũ rộng vành, kính râm, giày sandal hoặc dép biển, một vài bộ đồ đẹp để sống ảo bên bờ cát trắng. Camera hoặc điện thoại đầy pin để không bỏ lỡ những khoảnh khắc rực rỡ. Hãy luôn lắng nghe hướng dẫn viên, tôn trọng nội quy và cùng nhau giữ gìn môi trường – bởi chính bạn là người góp phần bảo vệ vẻ đẹp hoang sơ của đảo. Đây là tour lý tưởng cho cả gia đình, nhóm bạn thân hoặc các công ty đang tìm kiếm một chuyến đi vừa thư giãn, vừa gắn kết. Và hơn hết, nó có thể là một phần trong ký ức đẹp nhất của tuổi trẻ bạn – hành trình đi, cảm và sống giữa thiên nhiên thuần khiết.",
      },
    ],
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
    content: [
      {
        id: "t1",
        type: "title",
        text: "Hạ Long – Thiên đường du lịch giải trí không ngủ",
      },
      {
        id: "p1",
        type: "paragraph",
        html: "Không chỉ là kỳ quan thiên nhiên nổi tiếng toàn cầu, <strong>Hạ Long</strong> còn là điểm đến giải trí đầy màu sắc – nơi bạn có thể tìm thấy mọi cung bậc cảm xúc: từ bình yên bên vịnh biển trong xanh đến bùng nổ giữa những đêm nhạc hội rực rỡ ánh sáng.",
      },
      {
        id: "p2",
        type: "paragraph",
        html: "Với sự pha trộn giữa vẻ đẹp kỳ vĩ của thiên nhiên và hơi thở hiện đại của thành phố năng động, Hạ Long chào đón du khách bằng những trải nghiệm đỉnh cao – từ nghỉ dưỡng sang trọng đến những bữa tiệc ánh sáng và lễ hội sôi động kéo dài suốt cả năm. Mỗi bước chân ở đây là một hành trình mở rộng tầm mắt, là cơ hội để sống trọn từng khoảnh khắc giữa thiên nhiên và hiện đại giao thoa.",
      },
      {
        id: "img1",
        type: "image",
        src: "https://i.ibb.co/Z6Tydxbh/image.png",
        alt: "Toàn cảnh Hạ Long",
      },

      {
        id: "t2",
        type: "title",
        text: "Hạ tầng bứt phá – Kết nối không giới hạn",
      },
      {
        id: "p3",
        type: "paragraph",
        html: "Hạ Long của hôm nay là thành phố du lịch hiện đại bậc nhất miền Bắc, với hệ thống giao thông liên vùng được đầu tư mạnh mẽ. Cao tốc xuyên tỉnh, <strong>sân bay quốc tế Vân Đồn</strong> và <strong>cảng tàu khách quốc tế</strong> giúp hành trình đến Hạ Long chỉ còn tính bằng giờ – một chặng đường ngắn nhưng mang đến một thế giới khác biệt.",
      },
      {
        id: "p4",
        type: "paragraph",
        html: "Các tổ hợp khách sạn – resort sang trọng, trung tâm thương mại, công viên chủ đề và chuỗi ẩm thực cao cấp trải dài ven biển, sẵn sàng đáp ứng mọi nhu cầu du lịch, nghỉ dưỡng và giải trí của du khách trong và ngoài nước. Dù bạn đi một mình, cùng người thương hay cả gia đình, Hạ Long đều có những lựa chọn đẳng cấp phù hợp cho bạn.",
      },
      {
        id: "img2",
        type: "image",
        src: "https://i.ibb.co/CKHZCxk2/whee-Halong.jpg",
        alt: "Hạ tầng giao thông Hạ Long",
      },

      {
        id: "t3",
        type: "title",
        text: "Trải nghiệm không giới hạn – Vui chơi hết mình",
      },
      {
        id: "p5",
        type: "paragraph",
        html: "Dù bạn là người ưa khám phá thiên nhiên, đam mê mạo hiểm hay yêu thích sự náo nhiệt, Hạ Long đều có thứ để chinh phục trái tim bạn. Từ <strong>du thuyền hạng sang trên vịnh</strong>, khám phá <strong>hang Sửng Sốt</strong>, <strong>hang Thiên Cung</strong> đến thỏa sức vui chơi tại <strong>Sun World Halong Complex</strong> – công viên giải trí hàng đầu miền Bắc với cáp treo Nữ Hoàng, vòng quay Mặt Trời, công viên nước và hơn thế nữa.",
      },
      {
        id: "p6",
        type: "paragraph",
        html: 'Và khi màn đêm buông xuống, thành phố như bừng tỉnh trong một diện mạo khác – lung linh ánh đèn, náo nhiệt với các <strong>lễ hội ánh sáng, pháo hoa nghệ thuật, âm nhạc đường phố</strong> và những quán bar bên vịnh sôi động. Một Hạ Long "không ngủ" hiện ra như một vũ trụ thu nhỏ – nơi mỗi bước đi là một nốt nhạc, mỗi hơi thở là một cảm hứng sống trọn vẹn.',
      },
      {
        id: "img3",
        type: "image",
        src: "https://i.ibb.co/DPpJxrxF/image.png",
        alt: "Du lịch giải trí Hạ Long",
      },

      {
        id: "t4",
        type: "title",
        text: "Vươn mình thành trung tâm du lịch quốc tế",
      },
      {
        id: "p7",
        type: "paragraph",
        html: "Với tầm nhìn xa và những chiến lược phát triển bài bản, Hạ Long không ngừng chuyển mình để trở thành <strong>trung tâm du lịch đẳng cấp quốc tế</strong>. Cảnh quan thiên nhiên – dịch vụ hiện đại – con người thân thiện là ba yếu tố tạo nên thương hiệu “Hạ Long – điểm đến không thể bỏ lỡ của châu Á”.",
      },
      {
        id: "p8",
        type: "paragraph",
        html: "<em>Đừng chỉ nghe kể về Hạ Long – hãy đến và cảm nhận nhịp sống sôi động, vẻ đẹp trác tuyệt và tinh thần hiếu khách nơi đây. Hạ Long – nơi mọi hành trình đều bắt đầu bằng cảm hứng và kết thúc bằng những kỷ niệm khó quên.</em>",
      },
    ],
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
    content: [
      {
        id: "t1",
        type: "title",
        text: "Thách thức trong phát triển du lịch Hạ Long",
      },
      {
        id: "p1",
        type: "paragraph",
        html: "Du lịch Hạ Long phát triển mạnh mẽ như một cơn sóng lớn mang theo cơ hội vàng cho kinh tế và văn hóa, nhưng đi kèm theo đó là những áp lực vô hình đè nặng lên môi trường tự nhiên, hệ sinh thái biển và những giá trị di sản ngàn năm. Bảo tồn và phát triển bền vững không còn là lựa chọn, mà là điều bắt buộc, cấp thiết hơn bao giờ hết. Nếu không có giải pháp quyết liệt, những vẻ đẹp quý giá của vịnh có thể sẽ dần tan biến như những bọt sóng bạc đầu theo thời gian.",
      },
      {
        id: "p2",
        type: "paragraph",
        html: "Hàng ngàn lượt tàu du lịch mỗi ngày, những dòng người tấp nập cùng lượng rác thải phát sinh không kiểm soát đang âm thầm gặm nhấm vẻ đẹp nguyên sơ của vịnh. Những rạn san hô – từng là mái nhà của hàng nghìn loài sinh vật biển – đã và đang bị tổn thương nặng nề. Hệ sinh thái mong manh đứng trước ranh giới đổ vỡ. Đây không còn là bài toán riêng của ngành du lịch, mà là hồi chuông cảnh tỉnh cho cả cộng đồng, kêu gọi một sự thay đổi trong nhận thức và hành động.",
      },
      {
        id: "img1",
        type: "image",
        src: "https://i.ibb.co/x8jqh3tJ/image.png",
        alt: "Vịnh Hạ Long xanh",
      },

      { id: "t2", type: "title", text: "Du lịch xanh – Xu hướng tất yếu" },
      {
        id: "p3",
        type: "paragraph",
        html: "Du lịch xanh không chỉ là một khái niệm, mà là lời cam kết với thiên nhiên – một xu hướng tiến bộ đang lan rộng toàn cầu. Nó hướng tới việc giảm thiểu mọi tác động tiêu cực lên môi trường, khai thác tài nguyên một cách khôn ngoan, bảo vệ đa dạng sinh học, đồng thời trao quyền phát triển cho cộng đồng địa phương. Ngày càng nhiều doanh nghiệp ở Hạ Long tiên phong trong việc sử dụng vật liệu thân thiện với môi trường, giảm rác thải nhựa, tổ chức các hoạt động truyền thông xanh, và thiết kế tour kết hợp giáo dục bảo tồn.",
      },
      {
        id: "p4",
        type: "paragraph",
        html: "Không còn là xu hướng thoáng qua, du lịch xanh đang trở thành tiêu chuẩn mới, phản ánh sự tiến hóa trong tư duy du lịch của thế giới hiện đại. Những du khách thế hệ mới không còn chỉ đi để “check-in”, mà đi để tạo ra ảnh hưởng tích cực, để lắng nghe câu chuyện của một nơi chốn, để thấy mình là một phần trong hành trình gìn giữ cái đẹp. Và đó chính là cơ hội vàng để Hạ Long vươn mình: vừa giữ gìn di sản, vừa phát triển kinh tế theo hướng cân bằng, hài hòa, dài lâu.",
      },
      {
        id: "img2",
        type: "image",
        src: "https://i.ibb.co/27Gg651s/image.png",
        alt: "Du lịch xanh Hạ Long",
      },

      { id: "t3", type: "title", text: "Những giải pháp phát triển bền vững" },
      {
        id: "li1",
        type: "list",
        items: [
          "Khuyến khích sử dụng các phương tiện vận chuyển xanh như xe điện, tàu năng lượng mặt trời – không tiếng ồn, không khói bụi, không làm tổn hại hệ sinh thái biển.",
          "Hạn chế rác thải nhựa, triển khai đồng bộ các chiến dịch làm sạch vịnh, thu gom rác thải định kỳ tại các bãi biển, khu neo đậu tàu và các điểm tham quan đông khách.",
          "Phát triển các sản phẩm du lịch sinh thái, trải nghiệm văn hóa bản địa, du lịch cộng đồng giúp du khách tiếp xúc gần gũi với người dân địa phương và hiểu – yêu – bảo vệ Hạ Long từ trong ý thức.",
          "Tăng cường truyền thông xanh qua các nền tảng mạng xã hội, hội thảo, talkshow du lịch bền vững, xây dựng video hướng dẫn ứng xử văn minh và thân thiện với môi trường.",
          "Hợp tác với các chuyên gia môi trường, tổ chức quốc tế, tổ chức phi chính phủ để xây dựng chiến lược phát triển dựa trên dữ liệu khoa học, cập nhật xu hướng thế giới.",
          "Ứng dụng công nghệ số như cảm biến đo chất lượng nước, hệ thống giám sát du khách qua app thông minh, AI phân tích lưu lượng – để điều tiết và kiểm soát dòng khách hiệu quả, tránh quá tải.",
        ],
      },
      {
        id: "img3",
        type: "image",
        src: "https://i.ibb.co/4nQvgTjt/image.png",
        alt: "Bảo vệ môi trường Hạ Long",
      },

      { id: "t4", type: "title", text: "Khám phá Hạ Long xanh ngay hôm nay!" },
      {
        id: "p5",
        type: "paragraph",
        html: "Hãy trở thành người tiên phong trong hành trình du lịch xanh tại Hạ Long – nơi mỗi bước chân không chỉ để lại dấu ấn cá nhân, mà còn để lại điều tốt đẹp cho thế hệ mai sau. Đặt tour, lên lịch trình và tận hưởng một kỳ nghỉ không chỉ thư giãn mà còn có ý nghĩa – trọn vẹn về cảm xúc, đậm đà giá trị sống.",
      },
      {
        id: "p6",
        type: "paragraph",
        html: "Từ một buổi chèo kayak lặng lẽ giữa làn nước trong xanh, đến một sáng sớm ngồi với ngư dân học cách làm bánh chưng truyền thống – tất cả đều là hành động nhỏ góp phần tạo nên hành trình lớn: hành trình sống xanh – sống có trách nhiệm – sống kết nối. Hạ Long đang vẫy gọi bạn, không chỉ để khám phá, mà còn để đồng hành gìn giữ.",
      },
      {
        id: "p7",
        type: "paragraph",
        html: "<strong>Hãy lựa chọn du lịch có trách nhiệm – vì một Hạ Long luôn xanh, luôn sống, và luôn là điểm đến của những tâm hồn thức tỉnh.</strong>",
      },
    ],
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
    content: [
      {
        id: "t1",
        type: "title",
        text: "Giới thiệu tour Hạ Long - Đảo Ngọc Vừng 2 ngày 1 đêm",
      },
      {
        id: "p1",
        type: "paragraph",
        html: "Nếu bạn đang tìm kiếm một hành trình ngắn ngày để tạm lánh khói bụi phố thị, đắm mình trong vẻ đẹp yên bình, thơ mộng thì <strong>tour Hạ Long – Đảo Ngọc Vừng 2 ngày 1 đêm</strong> chính là món quà hoàn hảo dành cho bạn. Đảo Ngọc Vừng – nơi được thiên nhiên ưu ái với những bãi biển cát trắng mịn màng, nước biển xanh ngọc và không khí trong lành – là điểm dừng chân lý tưởng để nghỉ dưỡng và làm mới tâm hồn. Hãy để hành trình này dẫn bạn đến với những phút giây thư giãn tuyệt đối, khi mọi bộn bề thường nhật được gác lại phía sau.",
      },
      {
        id: "img1",
        type: "image",
        src: "https://i.ibb.co/fdwB0F5v/image.png",
        alt: "Đảo Ngọc Vừng",
      },
      {
        id: "t2",
        type: "title",
        text: "Lịch trình tour",
      },
      {
        id: "step1",
        type: "paragraph",
        html: "<b>Ngày 1:</b> Từ sáng sớm, xe đưa đón quý khách tại điểm hẹn, khởi hành tới thành phố biển Hạ Long. Sau hành trình êm đềm, đoàn lên tàu thẳng tiến đến đảo Ngọc Vừng – viên ngọc xanh giữa lòng vịnh Bái Tử Long. Sau khi nhận phòng và dùng bữa trưa, buổi chiều là khoảng thời gian tự do để bạn tận hưởng biển xanh cát trắng, thả mình trong làn nước mát rượi hay vui đùa cùng bạn bè bên những trò chơi bãi biển. Khi ánh hoàng hôn nhuộm đỏ chân trời, bạn sẽ được thưởng thức bữa tối hải sản tươi ngon và hòa mình vào đêm hội lửa trại – nơi tiếng hát hòa cùng sóng vỗ, ánh lửa hòa cùng nụ cười.",
      },
      {
        id: "step2",
        type: "paragraph",
        html: "<b>Ngày 2:</b> Một buổi sáng nhẹ nhàng bắt đầu bằng tiếng sóng vỗ và ánh nắng len qua cửa sổ. Sau bữa sáng, du khách sẽ đạp xe trên những cung đường ven biển rợp bóng cây xanh, ghé thăm làng chài truyền thống, trò chuyện với ngư dân chân chất và trải nghiệm chèo <i>kayak</i> giữa làn nước xanh như ngọc. Mỗi khoảnh khắc đều là một thước phim sống động, ghi dấu những kỷ niệm khó quên. Buổi trưa, đoàn trả phòng, tạm biệt hòn đảo yên bình và trở về Hạ Long bằng tàu, kết thúc hành trình với trái tim đầy ắp cảm xúc.",
      },
      {
        id: "t3",
        type: "title",
        text: "Dịch vụ bao gồm",
      },
      {
        id: "services",
        type: "list",
        items: [
          "Xe đưa đón khứ hồi hiện đại, tài xế chuyên nghiệp, hành trình an toàn và thoải mái.",
          "Khách sạn tiêu chuẩn trên đảo với không gian nghỉ ngơi yên tĩnh, tiện nghi và sạch sẽ.",
          "Vé tàu cao tốc, các bữa ăn theo thực đơn hải sản phong phú, đậm đà hương vị biển cả.",
          "Hướng dẫn viên thân thiện, nhiệt tình, luôn đồng hành và hỗ trợ trong suốt tour.",
          "Nhiều hoạt động hấp dẫn: team building, giao lưu lửa trại, trò chơi dân gian, khám phá văn hóa địa phương.",
        ],
      },
      {
        id: "img2",
        type: "image",
        src: "https://i.ibb.co/fdwB0F5v/image.png",
        alt: "Đảo Ngọc Vừng",
      },
      {
        id: "t4",
        type: "title",
        text: "Lưu ý khi tham gia tour",
      },
      {
        id: "notes",
        type: "list",
        items: [
          "Chuẩn bị đồ dùng cá nhân như kem chống nắng, mũ rộng vành, kính râm, dép đi biển để bảo vệ sức khỏe.",
          "Luôn tuân thủ chỉ dẫn của hướng dẫn viên để đảm bảo an toàn tuyệt đối trong suốt chuyến đi.",
          "Giữ gìn vệ sinh môi trường, không xả rác bừa bãi, cùng nhau chung tay gìn giữ vẻ đẹp nguyên sơ của đảo.",
          "Đừng quên máy ảnh hoặc điện thoại đầy pin để lưu lại những khoảnh khắc lung linh nơi thiên nhiên tuyệt mỹ.",
        ],
      },
      {
        id: "p2",
        type: "paragraph",
        html: "Tour Hạ Long – Đảo Ngọc Vừng 2N1Đ không chỉ là chuyến du lịch mà còn là hành trình chạm đến trái tim. Dành cho gia đình tìm kiếm sự gắn kết, nhóm bạn muốn chia sẻ kỷ niệm, hay các công ty mong muốn xây dựng tinh thần đồng đội – mỗi người đến đây đều mang về những ký ức thật đẹp. Hãy để hòn đảo nhỏ bé nhưng đậm tình này trở thành phần ký ức tuổi trẻ rực rỡ của bạn!",
      },
    ],
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
    content: [
      {
        type: "title",
        text: "A La Carte Hạ Long – Biểu tượng mới của nghỉ dưỡng hiện đại",
      },
      {
        type: "paragraph",
        html: `Nằm ngay bên bờ vịnh Hạ Long, A La Carte là khách sạn 5 sao nổi bật với kiến trúc hiện đại, không gian mở hướng biển và dịch vụ chuẩn quốc tế. Từ ban công phòng nghỉ, bạn có thể ngắm trọn vẹn vẻ đẹp kỳ vĩ của vịnh, tận hưởng làn gió biển mát lành mỗi sớm mai. Cảm giác thức dậy giữa thiên nhiên hùng vĩ, nhâm nhi tách cà phê và ngắm bình minh trên vịnh chắc chắn sẽ khiến bạn nhớ mãi.`,
      },
      {
        type: "image",
        src: "https://i.ibb.co/8gd3cjWp/image.png",
        alt: "A La Carte Hạ Long",
      },
      {
        type: "title",
        text: "Hồ bơi vô cực & Sky Bar – Check-in cực chất",
      },
      {
        type: "paragraph",
        html: `Điểm nhấn của A La Carte chính là hồ bơi vô cực trên tầng thượng, nơi bạn vừa bơi lội vừa phóng tầm mắt ra vịnh xanh ngọc bích. Đừng quên thưởng thức cocktail tại sky bar, tận hưởng không khí sôi động về đêm và lưu lại những bức hình “sống ảo” cực chất. Vào buổi tối, ánh đèn lung linh cùng âm nhạc sôi động sẽ biến nơi đây thành thiên đường giải trí giữa lòng di sản.`,
      },
      {
        type: "image",
        src: "https://i.ibb.co/L4B4WNp/image.png",
        alt: "Sky Bar A La Carte",
      },
      {
        type: "title",
        text: "Ẩm thực đa dạng – Hương vị Á Âu hội tụ",
      },
      {
        type: "paragraph",
        html: `Nhà hàng tại A La Carte phục vụ buffet sáng phong phú, các món hải sản tươi sống, đặc sản Quảng Ninh và thực đơn quốc tế. Bạn có thể thưởng thức bữa tối lãng mạn bên ánh nến, ngắm hoàng hôn buông xuống vịnh, hoặc tham gia các bữa tiệc BBQ ngoài trời cùng bạn bè, gia đình.`,
      },
      {
        type: "title",
        text: "Trải nghiệm giải trí & thư giãn",
      },
      {
        type: "paragraph",
        html: `
      <div class="blog-list-item">Tham gia lớp yoga sáng trên sân thượng, khởi đầu ngày mới đầy năng lượng và cảm hứng.</div>
      <div class="blog-list-item">Thư giãn tại spa với các liệu trình chăm sóc chuyên nghiệp, giúp bạn phục hồi sức khỏe và tinh thần.</div>
      <div class="blog-list-item">Khám phá khu vui chơi trẻ em, phòng gym hiện đại, đạp xe dạo quanh bờ biển, tận hưởng không khí trong lành.</div>
      <div class="blog-list-item">Đặt tour tham quan vịnh, chèo kayak, hoặc trải nghiệm du thuyền sang trọng ngay tại khách sạn, cảm nhận trọn vẹn vẻ đẹp Hạ Long từ nhiều góc nhìn khác nhau.</div>
    `,
      },
      {
        type: "image",
        src: "https://i.ibb.co/Psz5Y8gL/image.png",
        alt: "Sky Bar A La Carte",
      },
      {
        type: "title",
        text: "Lưu ý khi nghỉ dưỡng tại A La Carte Hạ Long",
      },
      {
        type: "paragraph",
        html: `
      <div class="blog-list-item">Nên đặt phòng trước, đặc biệt vào dịp cuối tuần và mùa cao điểm để chọn được vị trí đẹp nhất.</div>
      <div class="blog-list-item">Chuẩn bị đồ bơi, kính râm, kem chống nắng để tận hưởng trọn vẹn các tiện ích ngoài trời.</div>
      <div class="blog-list-item">Đừng bỏ lỡ các chương trình ưu đãi, tiệc BBQ hoặc sự kiện đặc biệt của khách sạn để chuyến đi thêm phần thú vị.</div>
    `,
      },
      {
        type: "paragraph",
        html: `A La Carte Hạ Long là lựa chọn lý tưởng cho kỳ nghỉ gia đình, cặp đôi hay nhóm bạn muốn tận hưởng không gian sang trọng, dịch vụ đẳng cấp và những trải nghiệm khó quên giữa lòng di sản thiên nhiên thế giới. Hãy đến và cảm nhận sự khác biệt tại A La Carte Hạ Long!`,
      },
    ],
    gallery: [
      "https://i.ibb.co/FktHq7Wy/image.png",
      "https://i.ibb.co/WNnqwLm7/image.png",
    ],
  },
];
