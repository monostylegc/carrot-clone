import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/usemutation';

interface uploadPostForm {
    question: string;
}

const Write: NextPage = () => {
    const { register, handleSubmit } = useForm<uploadPostForm>()
    const [uploadPost] = useMutation('/api/community/')

    const onValid = (data: uploadPostForm) => {
        uploadPost(data)
    }

    return (
        <Layout canGoBack title="Write Post">
            <form className="p-4 space-y-4" onSubmit={handleSubmit(onValid)}>
                <TextArea register={register('question', { required: true })} required placeholder="Ask a question!" />
                <Button text="Submit" />
            </form>
        </Layout>
    )
}

export default Write