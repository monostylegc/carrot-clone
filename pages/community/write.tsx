import type { NextPage } from "next";
import Button from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/usemutation';

const Write: NextPage = () => {
    const { register, handleSubmit } = useForm()
    const [] = useMutation('')

    return (
        <Layout canGoBack title="Write Post">
            <form className="p-4 space-y-4">
                <TextArea register={register('post', { required: true })} required placeholder="Ask a question!" />
                <Button text="Submit" />
            </form>
        </Layout>
    )
}

export default Write