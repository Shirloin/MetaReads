import React from 'react'
import { useParams } from 'react-router-dom'
import PageLayout from '../components/Layout/PageLayout';

function BookDetailPage() {
    const { bookId } = useParams();

  return (
    <PageLayout>
        BookDetailPage
    </PageLayout>
  )
}

export default BookDetailPage