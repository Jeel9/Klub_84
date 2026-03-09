import image from '../../components/image.png'; // Assuming the image is in the same directory as this file

export default function HomePage() {
  return (
    <div style={{ alignItems: "center", justifyContent: "center" }}>
      <img src={image} alt="HomePage Image" style={{
                    width: 500,
                    height: 600,
                    objectFit: "cover",
                    borderRadius: 6,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}/>
        <h3 style={{ textAlign: "center", marginTop: 20 }}>
          Welcome to 84 Kadva Patidar Samaj - Klub84
        </h3>
    </div>
  );
}