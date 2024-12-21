<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AddDefinitionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'meaning' => 'required|max:2000',
            'part_of_speech' => 'required|max:255',
            'example_sentence' => 'required|max:2000',
            'word_id' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'word_id.required' => 'Please choose a word.'
        ];
    }
}
