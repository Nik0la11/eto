const Location = () => {
  return (
    //eto da bi dodo kako treba lokaciju i da imam opciju da customizeam sve sto se tice toga potrebno je dodati karticu tako za sad je ovo lokacija

    <div className="w-full h-[400px] flex flex-col justify-center items-center bg-[#FAF9F6] mb-24 pt-12 ">
      <h3
        className="text-[#2E2E2E] font-['Great_Vibes'] font-semibold text-2xl pb-12 "
        id="location"
      >
        Lokacija
      </h3>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d593.7338108231464!2d18.672555366228153!3d44.937774545242114!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ssr!2sba!4v1748258373453!5m2!1ssr!2sba"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Location;
