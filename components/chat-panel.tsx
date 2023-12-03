import { type UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

export interface ChatPanelProps
  extends Pick<
    UseChatHelpers,
    | 'append'
    | 'isLoading'
    | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  handleModelChange?: any
}

interface LlamaModelsProps {
  handleModelChange: (selectedModel: string) => void
}

export function ChatPanel({
  id,
  isLoading,
  stop,
  append,
  reload,
  input,
  setInput,
  messages,
  handleModelChange
}: ChatPanelProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b from-muted/10 from-10% to-muted/30 to-50%">
      <ButtonScrollToBottom />
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className="flex h-10 items-center justify-center">
          {isLoading ? (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Stop generating
            </Button>
          ) : (
            messages?.length > 0 && (
              <Button
                variant="outline"
                onClick={() => reload()}
                className="bg-background"
              >
                <IconRefresh className="mr-2" />
                Regenerate response
              </Button>
            )
          )}
        </div>
        <div className="flex flex-col justify-end space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <LlamaModels handleModelChange={handleModelChange} />
          <PromptForm
            onSubmit={async value => {
              await append({
                id,
                content: value,
                role: 'user'
              })
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
          <FooterText className="hidden sm:block" />
        </div>
      </div>
    </div>
  )
}

const LlamaModels: React.FC<LlamaModelsProps> = ({ handleModelChange }) => {
  return (
    <span className="w-1/2">
      <Select onValueChange={handleModelChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a LLama" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="meta-llama/Llama-2-7b-chat-hf">
            Llama-2-7b-chat-hf
          </SelectItem>
          <SelectItem value="meta-llama/Llama-2-13b-chat-hf">
            Llama-2-13b-chat-hf
          </SelectItem>
          <SelectItem value="codellama/CodeLlama-34b-Instruct-hf">
            CodeLlama-34b-Instruct
          </SelectItem>
          <SelectItem value="HuggingFaceH4/zephyr-7b-beta">
            Zephyr-7b-beta
          </SelectItem>
          <SelectItem value="mistralai/Mistral-7B-Instruct-v0.1">
            Mistral-7B-Instruct-v0.1
          </SelectItem>
          <SelectItem value="meta-llama/Llama-2-70b-chat-hf">
            Llama-2-70b-chat-hf
          </SelectItem>
        </SelectContent>
      </Select>
    </span>
  )
}
