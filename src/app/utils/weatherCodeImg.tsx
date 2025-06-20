import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudRain,
  faCloudSun,
  faSnowflake,
  faBoltLightning,
  faSun,
} from "@fortawesome/free-solid-svg-icons";

export function weatherCodeImg(code: number | string) {
  const numCode = typeof code === "string" ? parseInt(code) : code;
  const size = "8x";
  if (numCode === 0)
    return <FontAwesomeIcon icon={faSun} size={size} color="#fff" />;
  if ([1, 2, 3].includes(numCode))
    return <FontAwesomeIcon icon={faCloudSun} size={size} color="#fff" />;
  if ((numCode >= 50 && numCode <= 68) || [80, 81, 82].includes(numCode))
    return <FontAwesomeIcon icon={faCloudRain} size={size} color="#fff" />;
  if ((numCode >= 70 && numCode <= 78) || [85, 86].includes(numCode))
    return <FontAwesomeIcon icon={faSnowflake} size={size} color="#fff" />;
  if (numCode >= 95)
    return <FontAwesomeIcon icon={faBoltLightning} size={size} color="#fff" />;
  return <FontAwesomeIcon icon={faCloudSun} size={size} color="#fff" />;
}
