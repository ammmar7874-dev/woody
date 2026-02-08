
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Minimal translation setup
const resources = {
  en: {
    translation: {
      "nav_home": "Home",
      "nav_products": "Collection",
      "nav_gallery": "Craftsmanship",
      "nav_about": "Our Story",
      "hero_title": "Artisanal Woodwork, Tailored to You",
      "hero_subtitle": "Experience the warmth of hand-selected timber, crafted with precision and passion.",
      "cta_quote": "Request a Quote",
      "section_collection": "The Collection",
      "section_collection_sub": "Explore our curated projects, each handcrafted with soul.",
      "section_bring_vision": "Bring Your Vision to Life",
      "section_bring_vision_text": "Every piece of wood has a story. Let's write the next chapter together with a custom furniture piece designed specifically for your home and lifestyle.",
      "craft_1": "Premium Walnut & Oak",
      "craft_2": "Hand-rubbed Natural Finishes",
      "craft_3": "Traditional Joinery Techniques",
      "about_title": "A Legacy of Wood & Soul",
      "about_philosophy": "Our Philosophy",
      "about_text_1": "At Woodify, we believe furniture is more than just functional objects; they are the silent witnesses of your life's most precious moments. Every grain of wood tells a story, and our mission is to preserve that story while crafting it into a piece of art that will serve your family for generations.",
      "about_text_2": "Founded in 1995, our workshop combines traditional Italian joinery techniques with modern sustainable practices. We don't just build furniture; we curate experiences for your home.",
      "contact_visit": "Visit Our Showroom",
      "quote_title": "Request a Custom Quote",
      "q_name": "Name",
      "q_email": "Email",
      "q_phone": "Phone",
      "q_desc_label": "Description of your request",
      "q_desc_ph": "Tell us about your dream furniture...",
      "q_upload": "Upload Inspiration/Sketches",
      "q_upload_sub": "Click to upload image",
      "q_timeline": "Desired Timeline",
      "q_t_1": "1-2 Weeks",
      "q_t_2": "1 Month",
      "q_t_3": "Flexible",
      "q_next": "Next Step",
      "q_back": "Back",
      "q_submit": "Submit Request",
      "q_success_title": "Thank You!",
      "q_success_text": "Your request has been sent. Our artisans will contact you soon.",
      "q_new": "New Request",
      "gallery_title": "Our Masterpieces",
      "gallery_subtitle": "A showcase of custom projects delivered to happy homes across the globe.",
      "btn_details": "Check Details",
      "pd_dimensions": "Dimensions",
      "pd_material": "Material",
      "pd_finish": "Finish",
      "pd_desc": "Description",
      "pd_offer_title": "Interested in this piece?",
      "pd_offer_text": "Request a custom offer for this item or a similar bespoke creation.",
      "steps_title": "Your Design Journey",
      "step_1": "Consultation",
      "step_2": "Design",
      "step_3": "Crafting",
      "step_4": "Delivery"
    }
  },
  tr: {
    translation: {
      "nav_home": "Ana Sayfa",
      "nav_products": "Koleksiyon",
      "nav_gallery": "Ustalık",
      "nav_about": "Hikayemiz",
      "hero_title": "Size Özel, El İşçiliği Ahşap",
      "hero_subtitle": "Hassasiyet ve tutkuyla işlenmiş, özenle seçilmiş kerestenin sıcaklığını hissedin.",
      "cta_quote": "Teklif Alın",
      "section_collection": "Koleksiyonumuz",
      "section_collection_sub": "Her biri ruhla işlenmiş küratörlü projelerimizi keşfedin.",
      "section_bring_vision": "Vizyonunuzu Hayata Geçirin",
      "section_bring_vision_text": "Her ağacın bir hikayesi vardır. Eviniz ve yaşam tarzınız için özel olarak tasarlanmış bir mobilya parçasıyla bir sonraki bölümü birlikte yazalım.",
      "craft_1": "Birinci Sınıf Ceviz ve Meşe",
      "craft_2": "El ile Uygulanan Doğal Cilalar",
      "craft_3": "Geleneksel Doğrama Teknikleri",
      "about_title": "Ahşap ve Ruhun Mirası",
      "about_philosophy": "Felsefemiz",
      "about_text_1": "Woodify'da mobilyaların sadece işlevsel nesnelerden daha fazlası olduğuna inanıyoruz; onlar hayatınızın en değerli anlarının sessiz tanıklarıdır. Her ahşap damarı bir hikaye anlatır ve misyonumuz, ailenize nesiller boyu hizmet edecek bir sanat eserine dönüştürürken bu hikayeyi korumaktır.",
      "about_text_2": "1995 yılında kurulan atölyemiz, geleneksel İtalyan doğrama tekniklerini modern sürdürülebilir uygulamalarla birleştiriyor. Biz sadece mobilya yapmıyoruz; eviniz için deneyimler küratörlüğü yapıyoruz.",
      "contact_visit": "Mağazamızı Ziyaret Edin",
      "quote_title": "Özel Teklif İsteyin",
      "q_name": "İsim",
      "q_email": "E-posta",
      "q_phone": "Telefon",
      "q_desc_label": "Talebinizin Açıklaması",
      "q_desc_ph": "Hayalinizdeki mobilyayı bize anlatın...",
      "q_upload": "İlham/Eskiz Yükle",
      "q_upload_sub": "Resim yüklemek için tıklayın",
      "q_timeline": "İstenilen Zaman Çizelgesi",
      "q_t_1": "1-2 Hafta",
      "q_t_2": "1 Ay",
      "q_t_3": "Esnek",
      "q_next": "Sonraki Adım",
      "q_back": "Geri",
      "q_submit": "Talebi Gönder",
      "q_success_title": "Teşekkürler!",
      "q_success_text": "Talebiniz gönderildi. Zanaatkarlarımız yakında sizinle iletişime geçecek.",
      "q_new": "Yeni Talep",
      "gallery_title": "Başyapıtlarımız",
      "gallery_subtitle": "Dünyanın dört bir yanındaki mutlu evlere teslim edilen özel projelerin vitrini.",
      "btn_details": "Detayları Gör",
      "pd_dimensions": "Boyutlar",
      "pd_material": "Malzeme",
      "pd_finish": "Cila",
      "pd_desc": "Açıklama",
      "pd_offer_title": "Bu parçayla ilgileniyor musunuz?",
      "pd_offer_text": "Bu ürün veya benzeri özel tasarım için teklif isteyin.",
      "steps_title": "Tasarım Yolculuğunuz",
      "step_1": "Danışmanlık",
      "step_2": "Tasarım",
      "step_3": "İşleme",
      "step_4": "Teslimat"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
