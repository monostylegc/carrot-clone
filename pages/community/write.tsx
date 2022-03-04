import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/usemutation';
import { useEffect } from 'react';
import { Post } from "@prisma/client";
import { useRouter } from 'next/router';

interface uploadPostForm {
    question: string;
}

interface UploadResponse {
    ok: boolean;
    post: Post;
}

const Write: NextPage = () => {
    const router = useRouter()
    const { register, handleSubmit } = useForm<uploadPostForm>()
    const [uploadPost, { loading, data }] = useMutation<UploadResponse>('/api/posts/')

    const onValid = (data: uploadPostForm) => {
        if (loading) return
        uploadPost(data)
    }

    useEffect(() => {
        if (data && data.ok) {
            router.push(`/community/${data.post.id}`)
        }
    }, [data, router])

    return (
        <Layout canGoBack title="Write Post">
            <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
                <TextArea register={register('question', { required: true, minLength: 10 })} required placeholder="Ask a question!" />
                <Button text={loading ? "Loading..." : "Submit"} />
            </form>
        </Layout>
    )
}

export default Write