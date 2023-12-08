import React, { useEffect, useState } from 'react'
import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  // ✨ where are my props? Destructure them here
   const {
    postArticle,
    updateArticle,
    setCurrentArticleId,
    currentArticleId,
    articles,

   } = props
   useEffect(() => {
    if (currentArticleId && articles.length > 0) {
      const currentArticle = articles.find(art => art.article_id === currentArticleId);
      if (currentArticle) {
        setValues({
          title: currentArticle.title || '',
          text: currentArticle.text || '',
          topic: currentArticle.topic || '',
        });
      }
    }
  }, [currentArticleId]);//,articles

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault()
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    const newArticle = {
      title: values.title,
      text: values.text,
      topic: values.topic,
    };
    const article_id = currentArticleId
    //console.log('current id',currentArticleId)
    currentArticleId ? updateArticle({article_id, newArticle})
    :postArticle(newArticle)
    //console.log(currentArticleId, "and", newArticle )
    setValues(initialFormValues)

  }

  const isDisabled = () => {
    // ✨ implement
    // Make sure the inputs have some values
    const isTitleEmpty = values.title.trim() === '';
    const isTextEmpty = values.text.trim() === '';
    const isTopicEmpty = values.topic.trim() === '';


    const isValidTopic = ['JavaScript', 'React', 'Node'].includes(values.topic);


    return isTitleEmpty || isTextEmpty || isTopicEmpty || !isValidTopic;
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      <h2>{currentArticleId ? 'Edit Article' : 'Create Article'}</h2>
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
       {currentArticleId && <button onClick={()=>setCurrentArticleId()}>Cancel edit</button>}
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
