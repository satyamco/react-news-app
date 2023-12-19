

const NewsCard = ({url, title, imgurl, sourceName, desc}) => {
  return (
    <a href={url} target="blank">
    <div className="news-card">
      <div className="card-header">
        <img src={imgurl} alt="news img" />
      </div>

      <div className="card-content">
        <h2 id="news-title">{title}</h2>
        <h6 className="news-source" id="news-source">
          {sourceName}
        </h6>
        <p className="news-desc" id="news-desc">
          {desc}
        </p>
      </div>
    </div>
  </a>
  )
}

export default NewsCard