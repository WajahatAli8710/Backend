import "./Avatar.scss";
const Avatar = ({ image, borderRadius , border }) => {
  return <img src={image} alt="" style={{ borderRadius: borderRadius , border: border }}/>;
};

export default Avatar;
