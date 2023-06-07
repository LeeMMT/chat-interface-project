import axios from 'axios'

const getAnswers = async (messages) => {
  const question = messages[messages.length - 1]
  const modifiedQuestion = `Question. ${question.content}\n\nAnswer: Let’s work this out in a step by step way to be sure we have the right answer.`

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [...messages.slice(0, -1), { role: 'user', content: modifiedQuestion }],
        n: 3,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
      }
    )

    console.log(response)

    return response.data.choices
  } catch (error) {
    console.error('Error while calling OpenAI API:', error)
  }
}

const analyzeAnswers = async (messages, answers) => {
  const question = messages[messages.length - 1]
  const modifiedQuestion = `Question. ${question.content}\n\nAnswer: Let’s work this out in a step by step way to be sure we have the right answer.`

  const combinedAnswers = `Question: ${messages[messages.length - 1].content}\n\n${answers
    .map((answer, index) => `Answer option ${index + 1}:\n\n${answer.message.content.trim()}`)
    .join('\n\n')}`

  console.log(combinedAnswers)

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          ...messages.slice(0, -1),
          { role: 'user', content: modifiedQuestion },
          { role: 'assistant', content: combinedAnswers },
          {
            role: 'user',
            content:
              'You are a researcher tasked with investigating the three response options provided. List the flaws and faulty logic of each answer option. Let’s work this out in a step by step way to be sure we have all the errors:',
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
      }
    )

    console.log(response)

    return { response: response.data.choices[0].message.content.trim(), combinedAnswers: combinedAnswers }
  } catch (error) {
    console.error('Error while calling OpenAI API:', error)
  }
}

const resolveAnswers = async (messages, combinedAnswers, analysis) => {
  const question = messages[messages.length - 1]
  const modifiedQuestion = `Question. ${question.content}\n\nAnswer: Let’s work this out in a step by step way to be sure we have the right answer.`

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages: [
          ...messages.slice(0, -1),
          { role: 'user', content: modifiedQuestion },
          { role: 'assistant', content: combinedAnswers },
          {
            role: 'user',
            content: `${analysis}\n\nYou are a resolver tasked with 1) finding which of the three answer options the researcher thought was best 2) improving that answer, and 3) Printing the improved answer in full. Let’s work this out in a step by step way to be sure we have the right answer:`,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
      }
    )

    console.log(response)

    return response.data.choices[0].message.content.trim()
  } catch (error) {
    console.error('Error while calling OpenAI API:', error)
  }
}

export { getAnswers, analyzeAnswers, resolveAnswers }
